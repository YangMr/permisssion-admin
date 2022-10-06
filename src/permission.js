/**
 * @author YangLing
 * @date 2022/10/6 10:35
 */
import router from './router'
import store from './store'
import { getToken, removeToken } from './utils/auth'

const whiteList = ['/404', '/401', '/login']
router.beforeEach(async (to, from, next) => {
  const token = getToken()
  if (token) {
    if (to.path === '/login') {
      next(from.path)
    } else {
      // vuex 有没有菜单的数据
      const menuList = store.getters.menuList
      if (menuList && menuList.length > 0) {
        next()
      } else {
        try {
          await store.dispatch('Menu/getMenuList')
          next()
        } catch (e) {
          console.log(e.message)
          removeToken()
          next('/login')
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})
