/**
 * @author YangLing
 * @date 2022/10/6 10:26
 */
import Cookies from 'js-cookie'

const TOKEN_KEY = 'token'

// 存储token
export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token)
}

// 获取token
export const getToken = () => {
  return Cookies.get(TOKEN_KEY)
}

// 删除token
export const removeToken = () => {
  Cookies.remove(TOKEN_KEY)
}

// 清空sessionStorage的数据
export const clearStorage = () => {
  sessionStorage.clear()
}
