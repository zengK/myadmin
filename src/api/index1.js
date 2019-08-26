import request from '@/utils/request'

export function login(params) {
  return request({
    url: '/qiniu/login',
    method: 'post',
    params
  })
}
