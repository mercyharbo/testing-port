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

const cookies = new Cookies()

// API endpoint constants
const ENDPOINTS = {
  CREATOR: {
    REGISTER: '/creator/register',
    LOGIN: '/creator/login',
    VALIDATE_OTP: '/creator/validate-registration-otp',
    RESEND_OTP: '/creator/resend-otp',
    PROFILE: '/creator/profile',
    PROFILE_UPDATE: '/creator/update-profile?section=',
    CHANGE_PASSWORD: '/creator/update-password',
  },
  RECRUITER: {
    REGISTER: '/recruiter/register',
    LOGIN: '/recruiter/login',
    VALIDATE_OTP: '/recruiter/validate-registration-otp',
    RESEND_OTP: '/recruiter/resend-otp',
    PROFILE: '/recruiter/profile',
    PROFILE_UPDATE: '/recruiter/update-profile?section=',
    CHANGE_PASSWORD: '/recruiter/update-password',
  },
}

interface ErrorResponse {
  message?: string
  error?: string
  status?: number // Add status to ErrorResponse
}

// Custom error class to include status
class ApiError extends Error {
  status?: number
  response?: ErrorResponse

  constructor(message: string, status?: number, response?: ErrorResponse) {
    super(message)
    this.status = status
    this.response = response
  }
}

// Error handling utility
export const handleApiError = (error: AxiosError<ErrorResponse>) => {
  const errorMessage =
    error.response?.data?.message ||
    error.response?.data?.error ||
    error.message ||
    'An unexpected error occurred'
  const status = error.response?.status // Get the HTTP status code
  throw new ApiError(errorMessage, status, error.response?.data)
}

// Auth storage management
export const AuthStorage = {
  setAuth: (
    token: string,
    userType: 'creator' | 'recruiter',
    userData: any,
    email?: string
  ) => {
    const options = {
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds (consistent with middleware)
    }

    try {
      cookies.set('access_token', token, options)
      cookies.set('userType', userType, options)
      cookies.set('userData', JSON.stringify(userData), options) // Ensure userData is stringified
      if (email) cookies.set('userEmail', email, options)
    } catch (error) {
      console.error('Error setting auth cookies:', error)
    }
  },

  clearAuth: () => {
    try {
      cookies.remove('access_token', { path: '/' })
      cookies.remove('userType', { path: '/' })
      cookies.remove('userData', { path: '/' })
      cookies.remove('userEmail', { path: '/' })
    } catch (error) {
      console.error('Error clearing auth cookies:', error)
    }
  },

  isAuthenticated: () => {
    const token = cookies.get('access_token')
    return !!token
  },

  getUserType: () => {
    const userType = cookies.get('userType')
    return userType as 'creator' | 'recruiter' | null
  },

  getUserData: <T = any>(): T | null => {
    const data = cookies.get('userData')
    if (!data) return null
    try {
      return JSON.parse(data) as T // Parse JSON string
    } catch (error) {
      console.error('Error parsing userData:', error)
      return null
    }
  },
}

// Creator authentication API
export const CreatorAuth = {
  register: async (formData: CreatorFormData): Promise<ApiResponse> => {
    try {
      const requestData = {
        full_name: formData.full_name,
        user_name: formData.user_name,
        email: formData.email,
        password: formData.password,
        state: formData.state,
        lga: formData.lga,
        years_of_experience: formData.years_of_experience,
        industry: formData.industry,
        field: formData.field,
      }

      const response = await apiClient.post(
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
      throw handleApiError(error as AxiosError<ErrorResponse>)
    }
  },
  login: async (credentials: LoginCredentials): Promise<ApiResponse> => {
    try {
      const response = await apiClient.post(
        ENDPOINTS.CREATOR.LOGIN,
        credentials
      )

      if (response.data.access_token) {
        AuthStorage.setAuth(
          response.data.access_token,
          'creator',
          response.data.profile
        )
      }

      return response.data
    } catch (error) {
      throw handleApiError(error as AxiosError<ErrorResponse>)
    }
  },
  validateRegistration: async (data: { token: string; email: string }) => {
    try {
      const response = await apiClient.put(ENDPOINTS.CREATOR.VALIDATE_OTP, data)

      console.log('response', response)

      if (response.data.token) {
        AuthStorage.setAuth(response.data.token, 'creator', response.data.data)
      }

      console.log('response', response)
      return {
        ...response.data,
        status: response.status,
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data) {
        // Return both the error response data and the status
        return {
          ...error.response.data,
          status: error.response.status,
        }
      }
      throw handleApiError(error as AxiosError<ErrorResponse>)
    }
  },
  resendOTP: async (email: string): Promise<ApiResponse> => {
    try {
      const response = await apiClient.put(ENDPOINTS.CREATOR.RESEND_OTP, {
        type: 'REGISTRATION',
        s_type: 'EMAIL',
        email: email,
      })

      return {
        ...response.data,
        status: response.status,
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data) {
        // Return both the error response data and the status
        return {
          ...error.response.data,
          status: error.response.status,
        }
      }
      throw handleApiError(error as AxiosError<ErrorResponse>)
    }
  },
  getProfile: async (): Promise<UserResponse> => {
    try {
      const response = await apiClient.get(ENDPOINTS.CREATOR.PROFILE)

      // Update stored user data with latest profile
      if (response.data.profile) {
        const userData = AuthStorage.getUserData()
        AuthStorage.setAuth(cookies.get('access_token'), 'creator', {
          ...userData,
          ...response.data.profile,
        })
      }

      return response.data
    } catch (error) {
      throw handleApiError(error as AxiosError<ErrorResponse>)
    }
  },
  logout: () => {
    AuthStorage.clearAuth()
    cookies.remove('access_token', { path: '/' })
    cookies.remove('userType', { path: '/' })
    cookies.remove('userData', { path: '/' })
    cookies.remove('userEmail', { path: '/' })
  },
  updateProfile: async (formData: ProfileUpdateFormData, slug: string) => {
    try {
      const response = await apiClient.put(
        `${ENDPOINTS.CREATOR.PROFILE_UPDATE}${slug}`,
        formData
      )

      return response.data
    } catch (error) {
      throw handleApiError(error as AxiosError<ErrorResponse>)
    }
  },
  updateResume: async (formData: ResumePayload, slug: string) => {
    try {
      const response = await apiClient.put(
        `${ENDPOINTS.CREATOR.PROFILE_UPDATE}${slug}`,
        formData
      )

      return response.data
    } catch (error) {
      throw handleApiError(error as AxiosError<ErrorResponse>)
    }
  },
  changePassword: async (formData: PasswordChangeType) => {
    try {
      const response = await apiClient.put(
        ENDPOINTS.CREATOR.CHANGE_PASSWORD,
        formData
      )

      return response.data
    } catch (error) {
      throw handleApiError(error as AxiosError<ErrorResponse>)
    }
  },
}

// Recruiter authentication API
export const RecruiterAuth = {
  register: async (formData: RecruiterFormData): Promise<ApiResponse> => {
    try {
      const requestData = {
        full_name: formData.full_name,
        email: formData.email,
        password: formData.password,
        company_name: formData.company_name,
        industry: formData.industry,
        about_us: formData.about_us,
      }

      const response = await apiClient.post(
        ENDPOINTS.RECRUITER.REGISTER,
        requestData
      )

      // Return the response data directly as it already contains status, message, etc.
      return response.data
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data) {
        // Pass through the API error response which includes status, message, etc.
        return error.response.data
      }
      throw handleApiError(error as AxiosError<ErrorResponse>)
    }
  },
  login: async (credentials: LoginCredentials): Promise<ApiResponse> => {
    try {
      const response = await apiClient.post(
        ENDPOINTS.RECRUITER.LOGIN,
        credentials
      )

      console.log('Recruiter login response:', response.data)

      if (response.data.access_token) {
        AuthStorage.setAuth(
          response.data.access_token,
          'recruiter',
          response.data.profile
        )
      }

      return response.data
    } catch (error) {
      throw handleApiError(error as AxiosError<ErrorResponse>)
    }
  },
  loginWithGoogle: async (): Promise<ApiResponse> => {
    try {
      const response = await apiClient.get(
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
      throw handleApiError(error as AxiosError<ErrorResponse>)
    }
  },
  validateRegistration: async (data: { token: string; email: string }) => {
    try {
      const response = await apiClient.put(
        ENDPOINTS.RECRUITER.VALIDATE_OTP,
        data
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
      if (error instanceof AxiosError && error.response?.data) {
        // Return both the error response data and the status
        return {
          ...error.response.data,
          status: error.response.status,
        }
      }
      throw handleApiError(error as AxiosError<ErrorResponse>)
    }
  },
  resendOTP: async (email: string): Promise<ApiResponse> => {
    try {
      const response = await apiClient.put(ENDPOINTS.RECRUITER.RESEND_OTP, {
        type: 'REGISTRATION',
        s_type: 'EMAIL',
        email: email,
      })

      return {
        ...response.data,
        status: response.status,
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data) {
        // Return both the error response data and the status
        return {
          ...error.response.data,
          status: error.response.status,
        }
      }
      throw handleApiError(error as AxiosError<ErrorResponse>)
    }
  },
  getProfile: async (): Promise<RecruiterResponse> => {
    try {
      const response = await apiClient.get(ENDPOINTS.RECRUITER.PROFILE)

      // Update stored user data with latest profile
      if (response.data.profile) {
        const userData = AuthStorage.getUserData()
        AuthStorage.setAuth(cookies.get('access_token'), 'recruiter', {
          ...userData,
          ...response.data.profile,
        })
      }

      return response.data
    } catch (error) {
      throw handleApiError(error as AxiosError<ErrorResponse>)
    }
  },
  updateProfile: async (formData: RecruiterProfilePayload, slug: string) => {
    try {
      const response = await apiClient.put(
        `${ENDPOINTS.RECRUITER.PROFILE_UPDATE}${slug}`,
        formData
      )

      return response.data
    } catch (error) {
      throw handleApiError(error as AxiosError<ErrorResponse>)
    }
  },
  changePassword: async (formData: PasswordChangeType) => {
    try {
      const response = await apiClient.put(
        ENDPOINTS.RECRUITER.CHANGE_PASSWORD,
        formData
      )

      return response.data
    } catch (error) {
      throw handleApiError(error as AxiosError<ErrorResponse>)
    }
  },
}

// Export auth utilities
export { AuthStorage as default }
