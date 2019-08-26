import request from '@/utils/request'
//获取验证码
export function apisms(params) {
  return request({
    url: '/api/sms',
    method: 'get',
    params:params
  })
}

export function login(params) {
  return request({
    url: '/api/login',
    method: 'get',
    params:params
  })
}
