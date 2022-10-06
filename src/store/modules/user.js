/**
 * @author YangLing
 * @date 2022/10/6 09:38
 */
import loginApi from '../../api/login'
import { setToken, getToken } from '../../utils/auth'

export default {
  namespaced: true,
  state: {
    token: getToken() || ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setToken(token)
    }
  },
  actions: {
    async handleLogin({ commit }, loginForm) {
      try {
        const response = await loginApi.login(loginForm)
        console.log(response)
        commit('setToken', response.token)
        return response
      } catch (e) {
        console.log(e.message)
      }
    }
  }
}
