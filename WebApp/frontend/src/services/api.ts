import axios from 'axios'

// Base URL
const getApiBaseUrl = () => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return (import.meta.env as any).VITE_API_URL || '/api'
  }
  return '/api'
}

const API_BASE_URL = getApiBaseUrl()

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000,
  withCredentials: true
})

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
      // Don't redirect automatically, let component handle it
      console.error('Unauthorized - token expired or invalid')
    }
    return Promise.reject(error)
  }
)

// Types
export interface User {
  id: number
  username: string
  email: string
  createdAt: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  username: string
  email: string
  userId: number
}

export interface Location {
  id: number
  name: string
  address: string
  city: string
  state?: string
  latitude: number
  longitude: number
  type?: string
  cuisine?: string
  rating: number
  description?: string
  imageUrl?: string
  createdAt: string
}

// API Methods
export const api = {
  // Auth
  auth: {
    register: (data: RegisterRequest) => 
      apiClient.post<AuthResponse>('/auth/register', data),
    login: (data: LoginRequest) => 
      apiClient.post<AuthResponse>('/auth/login', data),
    me: () => 
      apiClient.get<User>('/auth/me'),
    logout: () => {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
    }
  },

  // Users
  users: {
    getAll: () => apiClient.get<User[]>('/users'),
    getById: (id: number) => apiClient.get<User>(`/users/${id}`),
    create: (user: Omit<User, 'id' | 'createdAt'>) => 
      apiClient.post<User>('/users', user),
    update: (id: number, user: User) => 
      apiClient.put<void>(`/users/${id}`, user),
    delete: (id: number) => 
      apiClient.delete<void>(`/users/${id}`)
  },
  locations: {
  getAll: (params?: { type?: string; cuisine?: string; minRating?: number }) =>
    apiClient.get<Location[]>('/locations', { params }),
  getById: (id: number) =>
    apiClient.get<Location>(`/locations/${id}`),
  create: (location: Omit<Location, 'id' | 'createdAt'>) =>
    apiClient.post<Location>('/locations', location),
  update: (id: number, location: Location) =>
    apiClient.put<void>(`/locations/${id}`, location),
  delete: (id: number) =>
    apiClient.delete<void>(`/locations/${id}`),
  getTypes: () =>
    apiClient.get<string[]>('/locations/types'),
  getCuisines: () =>
    apiClient.get<string[]>('/locations/cuisines'),
  seed: () =>
    apiClient.post('/locations/seed')
},

  // Google Maps
  maps: {
    geocode: (address: string) => 
      apiClient.get(`/maps/geocode`, { params: { address } })
  },

  // Health check
  health: () => apiClient.get('/health')
}

export default apiClient