import { UserType } from '@/types/auth'

export const AuthStorage = {
  setAuth: (
    token: string,
    userType: UserType,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userData: unknown,
    email?: string
  ) => {
    try {
      // Set both localStorage and cookies for compatibility
      localStorage.setItem('access_token', token)
      localStorage.setItem('userType', userType)
      localStorage.setItem('userData', JSON.stringify(userData))
      if (email) localStorage.setItem('userEmail', email)

      // Set cookies using document.cookie for server-side compatibility
      const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      document.cookie = `access_token=${token}; path=/; expires=${expires.toUTCString()}; ${
        process.env.NODE_ENV === 'production' ? 'secure;' : ''
      } sameSite=strict`
      document.cookie = `userType=${userType}; path=/; expires=${expires.toUTCString()}; ${
        process.env.NODE_ENV === 'production' ? 'secure;' : ''
      } sameSite=strict`
      document.cookie = `userData=${encodeURIComponent(
        JSON.stringify(userData)
      )}; path=/; expires=${expires.toUTCString()}; ${
        process.env.NODE_ENV === 'production' ? 'secure;' : ''
      } sameSite=strict`
      if (email) {
        document.cookie = `userEmail=${email}; path=/; expires=${expires.toUTCString()}; ${
          process.env.NODE_ENV === 'production' ? 'secure;' : ''
        } sameSite=strict`
      }
    } catch (error) {
      console.error('Error setting auth cookies:', error)
    }
  },

  clearAuth: () => {
    try {
      // Clear localStorage
      localStorage.removeItem('access_token')
      localStorage.removeItem('userType')
      localStorage.removeItem('userData')
      localStorage.removeItem('userEmail')

      // Clear cookies
      document.cookie =
        'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      document.cookie =
        'userType=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      document.cookie =
        'userData=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      document.cookie =
        'userEmail=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    } catch (error) {
      console.error('Error clearing auth data:', error)
    }
  },

  isAuthenticated: () => {
    const token =
      localStorage.getItem('access_token') ||
      document.cookie
        .split('; ')
        .find((row) => row.startsWith('access_token='))
        ?.split('=')[1]
    return !!token
  },

  getUserType: () => {
    const userType =
      localStorage.getItem('userType') ||
      document.cookie
        .split('; ')
        .find((row) => row.startsWith('userType='))
        ?.split('=')[1]
    return userType as UserType | null
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getUserData: <T = unknown>(): T | null => {
    try {
      const data =
        localStorage.getItem('userData') ||
        document.cookie
          .split('; ')
          .find((row) => row.startsWith('userData='))
          ?.split('=')[1]
      if (!data) return null
      return JSON.parse(decodeURIComponent(data)) as T
    } catch (error) {
      console.error('Error parsing userData:', error)
      return null
    }
  },
}
