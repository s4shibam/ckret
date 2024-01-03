import axios from 'axios'
import { getSession } from 'next-auth/react'
const ckretConnectURL = process.env.NEXT_PUBLIC_CKRET_CONNECT_URL

// Custom Axios instance with common configurations
const ckretConnect = axios.create({
  baseURL: ckretConnectURL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptors
ckretConnect.interceptors.request.use(
  async (config) => {
    config.headers = config.headers || {}
    const session = await getSession()

    if (session?.user?.token && !config.headers.Authorization) {
      const authToken = `Bearer ${session.user.token}`
      config.headers.Authorization = authToken
    }
    return config
  },
  (error) => {
    console.error('Failed to send request: ', error)
    return Promise.reject(error)
  }
)

ckretConnect.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.error('API Error: ', error)

    return Promise.reject(error?.response?.data)
  }
)

export default ckretConnect
