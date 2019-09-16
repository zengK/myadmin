import request from '@/utils/request'
import Qs from 'qs'
//获取验证码
export function apisms(params) {
  return request({
    url: '/api/sms',
    method: 'get',
    params: params
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
//宇:
// http://47.104.162.109/api/getExcel
export function getExcel(params) {
  return request({
    url: '/api/getExcel',
    method: 'post',
    data: params
  })
}
// api/inquirecity
export function inquirecity(params) {
  return request({
    url: '/api/inquirecity',
    method: 'post',
    data: params
  })
}
//api/inquiresku
export function inquiresku(params) {
  return request({
    url: '/api/inquiresku',
    method: 'get',
    params: params
  })
}
//api/consumptionlevel
export function consumptionlevel(params) {
  return request({
    url: '/api/consumptionlevel',
    method: 'post',
    data: params
  })
}
//消费频次分析
//api/consumptionfrequency
export function consumpquency(params) {
  return request({
    url: '/api/consumptionfrequency',
    method: 'post',
    data: params
  })
}
//RFM
//api/inquireRfm
export function inquireRfm(params) {
  return request({
    url: '/api/inquireRfm',
    method: 'get',
    params: params
  })
}