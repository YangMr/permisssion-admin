/**
 * @author YangLing
 * @date 2022/10/6 08:35
 */
import axios from 'axios'

import { Message } from 'element-ui'

import { getToken } from './auth'

// 自定义异常提示信息
const exceptionMessage = {
  // 500: '登录失败'
}

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(function (config) {
  const token = getToken()
  if (token) {
    config.headers.token = token
  }

  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(function (response) {
  if (response.status === 200) {
    if (response.data.code === 200 || response.config.responseType === 'arraybuffer') {
      return response.data
    }
    if (response.data.code === 600) {
      // TODO token过期处理
      return
    }

    _showErrorMessage(response.data.code, response.data.msg)
  }
}, function (error) {
  return Promise.reject(error)
})

const _showErrorMessage = (code, msg) => {
  const message = exceptionMessage[code] || msg || '未知错误'
  Message({ message, type: 'error' })
}

// 统一传参
const request = (options) => {
  options.method = options.method || 'GET'
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data
  }
  return service(options)
}

export default request
