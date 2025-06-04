import { UserProfile } from '@/types/user'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import AuthStorage from '../lib/requests/auth.new'

export interface AuthState {
  user: UserProfile | null
  loading: boolean
  error: string | null
}

export function useAuth() {
  const router = useRouter()
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    const checkAuth = () => {
      try {
        const userData = AuthStorage.getUserData()
        setState({
          user: userData,
          loading: false,
          error: null,
        })
      } catch (error) {
        console.error('Error loading user data:', error)
        setState({
          user: null,
          loading: false,
          error: 'Failed to load user data',
        })
      }
    }

    checkAuth()

    // Listen for storage changes (e.g., when another tab logs out)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'userData' || e.key === 'authToken') {
        checkAuth()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const redirectToHomepage = () => {
    const user_type = AuthStorage.getUserType()
    if (!state.user) return

    if (user_type === 'creator') {
      router.push('/creative-homepage')
    } else if (user_type === 'recruiter') {
      router.push('/recruiter-homepage')
    } else {
      router.push('/')
    }
  }

  const isAuthenticated = () => {
    return AuthStorage.isAuthenticated()
  }

  return {
    user: state.user,
    loading: state.loading,
    error: state.error,
    isAuthenticated,
    redirectToHomepage,
  }
}
