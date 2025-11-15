import axios from 'axios'

// Base URL - va folosi proxy-ul din vite.config.ts în dev
// În producție (Docker), va folosi nginx proxy
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Adaugă token dacă aveți autentificare
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor pentru error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized')
      // Redirect to login dacă aveți autentificare
    }
    if (error.response?.status === 500) {
      console.error('Server error')
    }
    return Promise.reject(error)
  }
)

// Types
export interface User {
  id: number
  name: string
  email: string
  createdAt: string
}

// API Methods - Exportați funcții pe care colegele le pot folosi
export const api = {
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

  // Google Maps
  maps: {
    geocode: (address: string) => 
      apiClient.get(`/maps/geocode`, { params: { address } })
  },

  // Health check
  health: () => apiClient.get('/health')
}

export default apiClient