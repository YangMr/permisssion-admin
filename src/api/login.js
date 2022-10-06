/**
 * @author YangLing
 * @date 2022/10/6 08:40
 */

import request from '../utils/request'
import qs from 'qs'

/**
 * 获取图片验证码接口
 * @returns {AxiosPromise}
 */
const getCapture = () => {
  return request({
    url: '/sysUser/image',
    method: 'POST',
    responseType: 'arraybuffer'
  })
}

/**
 * 登录接口
 * @param data
 * @returns {AxiosPromise}
 */
const login = (data) => {
  return request({
    url: '/user/login',
    method: 'POST',
    data: qs.stringify(data)
  })
}

/**
 * 获取权限列表接口
 * @returns {AxiosPromise}
 */
const getPermissionList = () => {
  return request({
    url: '/sysUser/getPermissionList',
    method: 'GET'
  })
}

export default {
  login,
  getCapture,
  getPermissionList
}
