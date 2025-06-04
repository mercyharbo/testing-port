import apiClient from '@/service/apiClient'
import {
  ApiResponse,
  CreatorFormData,
  LoginCredentials,
  RecruiterFormData,
} from '@/types/auth'
import { RecruiterProfilePayload, RecruiterResponse } from '@/types/recruiter'
import {
  PasswordChangeType,
  ProfileUpdateFormData,
  ResumePayload,
  UserResponse,
} from '@/types/user'
import { AxiosError } from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies(null, { path: '/' })

// API endpoint constants
const ENDPOINTS = {
  CREATOR: {
    REGISTER: '/creator/register',
    LOGIN: '/creator/login',
    VALIDATE_OTP: '/creator/validate-registration-otp',
    RESEND_OTP: '/creator/resend-otp',
    PROFILE: '/creator/profile',
    PROFILE_UPDATE: '/creator/update-profile',
    CHANGE_PASSWORD: '/creator/update-password',
  },
  RECRUITER: {
    REGISTER: '/recruiter/register',
    LOGIN: '/recruiter/login',
    VALIDATE_OTP: '/recruiter/validate-registration-otp',
    RESEND_OTP: '/recruiter/resend-otp',
    PROFILE: '/recruiter/profile',
    PROFILE_UPDATE: '/recruiter/update-profile',
    CHANGE_PASSWORD: '/recruiter/update-password',
  },
}

interface ErrorResponse {
  message?: string
  error?: string
  status?: number
}

// Custom error class for API errors
class ApiError extends Error {
  status?: number
  response?: ErrorResponse

  constructor(message: string, status?: number, response?: ErrorResponse) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.response = response
  }
}

// Error handling utility
const handleApiError = (error: unknown): ApiError => {
  if (error instanceof AxiosError && error.response?.data) {
    const errorMessage =
      error.response.data.message ||
      error.response.data.error ||
      'An unexpected error occurred'
    return new ApiError(
      errorMessage,
      error.response.status,
      error.response.data
    )
  }
  return new ApiError('An unexpected error occurred')
}

// Auth storage management
export const AuthStorage = {
  setAuth: (
    token: string,
    userType: 'creator' | 'recruiter',
    userData: unknown,
    email?: string
  ): void => {
    const options = {
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      maxAge: 7 * 24 * 60 * 60, // 7 days
    }

    try {
      cookies.set('access_token', token, options)
      cookies.set('userType', userType, options)
      cookies.set('userData', JSON.stringify(userData), options)
      if (email) cookies.set('userEmail', email, options)
    } catch (error) {
      console.error('Failed to set auth cookies:', error)
      throw new ApiError('Failed to set authentication data')
    }
  },

  clearAuth: (): void => {
    try {
      cookies.remove('access_token', { path: '/' })
      cookies.remove('userType', { path: '/' })
      cookies.remove('userData', { path: '/' })
      cookies.remove('userEmail', { path: '/' })
    } catch (error) {
      console.error('Failed to clear auth cookies:', error)
      throw new ApiError('Failed to clear authentication data')
    }
  },

  isAuthenticated: (): boolean => {
    return !!cookies.get('access_token')
  },

  getUserType: (): 'creator' | 'recruiter' | null => {
    const userType = cookies.get('userType')
    return userType === 'creator' || userType === 'recruiter' ? userType : null
  },

  getUserData: <T>(): T | null => {
    const data = cookies.get('userData')
    if (!data) return null
    try {
      return JSON.parse(data) as T
    } catch (error) {
      console.error('Failed to parse user data:', error)
      return null
    }
  },

  getUserEmail: (): string | null => {
    return cookies.get('userEmail') || null
  },
}

// Creator authentication API
export const CreatorAuth = {
  register: async (formData: CreatorFormData): Promise<ApiResponse> => {
    try {
      const requestData = {
        full_name: formData.full_name?.trim(),
        user_name: formData.user_name?.trim(),
        email: formData.email?.trim(),
        password: formData.password,
        state: formData.state?.trim(),
        lga: formData.lga?.trim(),
        years_of_experience: formData.years_of_experience,
        industry: formData.industry?.trim(),
        field: formData.field?.trim(),
      }

      const response = await apiClient.post<ApiResponse>(
        ENDPOINTS.CREATOR.REGISTER,
        requestData
      )

      if (response.data.token) {
        AuthStorage.setAuth(
          response.data.token,
          'creator',
          response.data.data,
          formData.email
        )
      }

      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  },

  login: async (credentials: LoginCredentials): Promise<ApiResponse> => {
    try {
      const response = await apiClient.post<ApiResponse>(
        ENDPOINTS.CREATOR.LOGIN,
        {
          email: credentials.email?.trim(),
          password: credentials.password,
        }
      )

      if (response.data.access_token) {
        AuthStorage.setAuth(
          response.data.access_token,
          'creator',
          response.data.profile,
          credentials.email
        )
      }

      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  },

  validateRegistration: async (data: {
    token: string
    email: string
  }): Promise<ApiResponse & { status: number }> => {
    try {
      const response = await apiClient.put<ApiResponse>(
        ENDPOINTS.CREATOR.VALIDATE_OTP,
        {
          token: data.token?.trim(),
          email: data.email?.trim(),
        }
      )

      if (response.data.token) {
        AuthStorage.setAuth(response.data.token, 'creator', response.data.data)
      }

      return {
        ...response.data,
        status: response.status,
      }
    } catch (error) {
      throw handleApiError(error)
    }
  },

  resendOTP: async (
    email: string
  ): Promise<ApiResponse & { status: number }> => {
    try {
      const response = await apiClient.put<ApiResponse>(
        ENDPOINTS.CREATOR.RESEND_OTP,
        {
          type: 'REGISTRATION',
          s_type: 'EMAIL',
          email: email?.trim(),
        }
      )

      return {
        ...response.data,
        status: response.status,
      }
    } catch (error) {
      throw handleApiError(error)
    }
  },

  getProfile: async (): Promise<UserResponse> => {
    try {
      const response = await apiClient.get<UserResponse>(
        ENDPOINTS.CREATOR.PROFILE
      )

      if (response.data.profile) {
        const userData = AuthStorage.getUserData()
        AuthStorage.setAuth(cookies.get('access_token'), 'creator', {
          ...userData,
          ...response.data.profile,
        })
      }

      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  },

  logout: (): void => {
    AuthStorage.clearAuth()
  },

  updateProfile: async (
    formData: ProfileUpdateFormData,
    slug: string
  ): Promise<ApiResponse> => {
    try {
      const response = await apiClient.put<ApiResponse>(
        `${ENDPOINTS.CREATOR.PROFILE_UPDATE}?section=${encodeURIComponent(
          slug
        )}`,
        formData
      )
      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  },

  updateResume: async (
    formData: ResumePayload,
    slug: string
  ): Promise<ApiResponse> => {
    try {
      const response = await apiClient.put<ApiResponse>(
        `${ENDPOINTS.CREATOR.PROFILE_UPDATE}?section=${encodeURIComponent(
          slug
        )}`,
        formData
      )
      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  },

  changePassword: async (
    formData: PasswordChangeType
  ): Promise<ApiResponse> => {
    try {
      const response = await apiClient.put<ApiResponse>(
        ENDPOINTS.CREATOR.CHANGE_PASSWORD,
        formData
      )
      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  },
}

// Recruiter authentication API
export const RecruiterAuth = {
  register: async (formData: RecruiterFormData): Promise<ApiResponse> => {
    try {
      const requestData = {
        full_name: formData.full_name?.trim(),
        email: formData.email?.trim(),
        password: formData.password,
        company_name: formData.company_name?.trim(),
        industry: formData.industry?.trim(),
        about_us: formData.about_us?.trim(),
      }

      const response = await apiClient.post<ApiResponse>(
        ENDPOINTS.RECRUITER.REGISTER,
        requestData
      )

      if (response.data.token) {
        AuthStorage.setAuth(
          response.data.token,
          'recruiter',
          response.data.data,
          formData.email
        )
      }

      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  },

  login: async (credentials: LoginCredentials): Promise<ApiResponse> => {
    try {
      const response = await apiClient.post<ApiResponse>(
        ENDPOINTS.RECRUITER.LOGIN,
        {
          email: credentials.email?.trim(),
          password: credentials.password,
        }
      )

      if (response.data.access_token) {
        AuthStorage.setAuth(
          response.data.access_token,
          'recruiter',
          response.data.profile,
          credentials.email
        )
      }

      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  },

  loginWithGoogle: async (): Promise<ApiResponse> => {
    try {
      const response = await apiClient.get<ApiResponse>(
        `${ENDPOINTS.RECRUITER.LOGIN}/google`
      )

      if (response.data.access_token) {
        AuthStorage.setAuth(
          response.data.access_token,
          'recruiter',
          response.data.profile
        )
      }

      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  },

  validateRegistration: async (data: {
    token: string
    email: string
  }): Promise<ApiResponse & { status: number }> => {
    try {
      const response = await apiClient.put<ApiResponse>(
        ENDPOINTS.RECRUITER.VALIDATE_OTP,
        {
          token: data.token?.trim(),
          email: data.email?.trim(),
        }
      )

      if (response.data.token) {
        AuthStorage.setAuth(
          response.data.token,
          'recruiter',
          response.data.data
        )
      }

      return {
        ...response.data,
        status: response.status,
      }
    } catch (error) {
      throw handleApiError(error)
    }
  },

  resendOTP: async (
    email: string
  ): Promise<ApiResponse & { status: number }> => {
    try {
      const response = await apiClient.put<ApiResponse>(
        ENDPOINTS.RECRUITER.RESEND_OTP,
        {
          type: 'REGISTRATION',
          s_type: 'EMAIL',
          email: email?.trim(),
        }
      )

      return {
        ...response.data,
        status: response.status,
      }
    } catch (error) {
      throw handleApiError(error)
    }
  },

  getProfile: async (): Promise<RecruiterResponse> => {
    try {
      const response = await apiClient.get<RecruiterResponse>(
        ENDPOINTS.RECRUITER.PROFILE
      )

      if (response.data.profile) {
        const userData = AuthStorage.getUserData()
        AuthStorage.setAuth(cookies.get('access_token'), 'recruiter', {
          ...userData,
          ...response.data.profile,
        })
      }

      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  },

  updateProfile: async (
    formData: RecruiterProfilePayload,
    slug: string
  ): Promise<ApiResponse> => {
    try {
      const response = await apiClient.put<ApiResponse>(
        `${ENDPOINTS.RECRUITER.PROFILE_UPDATE}?section=${encodeURIComponent(
          slug
        )}`,
        formData
      )
      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  },

  changePassword: async (
    formData: PasswordChangeType
  ): Promise<ApiResponse> => {
    try {
      const response = await apiClient.put<ApiResponse>(
        ENDPOINTS.RECRUITER.CHANGE_PASSWORD,
        formData
      )
      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  },
}

export default AuthStorage
