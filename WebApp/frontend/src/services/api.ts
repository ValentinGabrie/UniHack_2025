import axios from 'axios'

// Base API URL - can be configured via environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor for adding auth tokens (if needed)
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token here if you implement authentication
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.error('Unauthorized access')
    }
    return Promise.reject(error)
  }
)

// User API
export interface User {
  id: number
  name: string
  email: string
  createdAt: string
}

export const userApi = {
  getAll: () => apiClient.get<User[]>('/users'),
  getById: (id: number) => apiClient.get<User>(`/users/${id}`),
  create: (user: Omit<User, 'id' | 'createdAt'>) => apiClient.post<User>('/users', user),
  update: (id: number, user: User) => apiClient.put<void>(`/users/${id}`, user),
  delete: (id: number) => apiClient.delete<void>(`/users/${id}`)
}

// Google Maps API
export interface GeocodingResult {
  address: string
  latitude: number
  longitude: number
}

export const mapsApi = {
  geocode: (address: string) => 
    apiClient.get<GeocodingResult>('/maps/geocode', { params: { address } })
}

// Health Check
export const healthApi = {
  check: () => apiClient.get('/health')
}

// Export the client for custom requests
export default apiClient