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
//	api/bind

export function bind(params) {
  return request({
    url: '/api/bind',
    method: 'get',
    params:Qs.parse(params)
  })
}
// api/bindstoreid
export function bindstoreid(params) {
  return request({
    url: '/api/bindstoreid',
    method: 'post',
    data: params
  })
}
//获取支付接口
// api/alipay
export function alipay(params) {
  return request({
    url: '/api/alipay',
    method: 'get',
    data: params
  })
}