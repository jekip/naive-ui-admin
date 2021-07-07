import http from '@/utils/http/axios'
import { LoginParams, LoginResultModel } from './model/userModel'

export interface BasicResponseModel<T = any> {
  code: number
  message: string
  result: T
}

export interface BasicPageParams {
  pageNumber: number
  pageSize: number
  total: number
}

/**
 * @description: 获取用户信息
 */
export function getUserInfo() {
  return http.request(
    {
      url: '/admin_info',
      method: 'get'
    }
  )
}

/**
 * @description: 用户登录
 */
export function login(params: LoginParams) {
  return http.request<BasicResponseModel<LoginResultModel>>(
    {
      url: '/login',
      method: 'POST',
      params
    },
    {
      isTransformRequestResult: false
    }
  )
}

/**
 * @description: 用户修改密码
 */
export function changePassword(params, uid) {
  return http.request(
    {
      url: `/user/u${ uid }/changepw`,
      method: 'POST',
      params
    },
    {
      isTransformRequestResult: false
    }
  )
}

/**
 * @description: 用户登出
 */
export function logout(params) {
  return http.request({
    url: '/login/logout',
    method: 'POST',
    params
  })
}
