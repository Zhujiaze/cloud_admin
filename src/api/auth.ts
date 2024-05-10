import request from '../utils/request'
import type { LoginParamsType, responseUserInfoType } from './types/authType'


//登录
export const login = (loginParams: LoginParamsType) => {
    return request('/auth/token', 'POST', loginParams)
}
//获取用户信息
export const ueseInfo = () => {
    return request<responseUserInfoType>('/system/menu/user', 'get')
}

export const logout = () => {
    return request('/auth/token', 'POST')
}
