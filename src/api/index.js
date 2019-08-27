import request from '@/utils/request'
import Qs from 'qs'
//获取验证码
export function apisms(params) {
  return request({
    url: '/api/sms',
    method: 'get',
    params: Qs.parse(params)
  })
}

export function login(params) {
  return request({
    url: '/api/login',
    method: 'get',
    params:Qs.parse(params)
  })
}
