import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://blog.shanyutiwen.club/', // api的base_url
  contentType: 'application/x-www-form-urlencoded',
  timeout: 120000 // 请求超时时间
})
// request拦截器

service.interceptors.request.use(config => {
  return config
}, error => {
  Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)
export default service
