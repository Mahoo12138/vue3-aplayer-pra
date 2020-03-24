import axios from 'axios'


export function request(config) {
  // 1. 创建 axios 实例
  const axiosInstance = axios.create({
    baseURL: '/api',
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json'
    },
  })
  return axiosInstance(config)
}