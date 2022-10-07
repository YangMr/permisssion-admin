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
          const { response, routerArray } = await store.dispatch('Menu/getMenuList')

          if (response) {
            routerArray.forEach(item => {
              router.addRoute('layout', item)
            })
            router.addRoute({
              path: '*',
              redirect: '/404'
            })
            console.log('zg', router.getRoutes())
            next({ path: to.path })
          } else {
            removeToken()
            next('/login')
          }
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
