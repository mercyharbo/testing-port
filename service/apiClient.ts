import axios, { AxiosInstance } from 'axios'
import Cookies from 'universal-cookie'

interface ApiErrorResponse {
  message?: string
  error?: string
}

const cookies = new Cookies()

export const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token from cookies to request headers
apiClient.interceptors.request.use(
  (config) => {
    const token = cookies.get('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default apiClient
