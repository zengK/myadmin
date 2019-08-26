import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: '/admin/', // api的base_url
  timeout: 120000 // 请求超时时间
})
// request拦截器

service.interceptors.request.use(config => {
  return config
}, error => {
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    return Promise.reject(response)
  },
  error => {
  
    return Promise.reject(error)
  }
)

export default service
