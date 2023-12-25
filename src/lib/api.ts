import axios from 'axios'
const ckretConnectURL = process.env.NEXT_PUBLIC_CKRET_CONNECT_URL

// Custom Axios instance with common configurations
const ckretConnect = axios.create({
  baseURL: ckretConnectURL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default ckretConnect
