import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

// 解决重复点击路由出现的错误
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/404',
    component: () => import('../views/404')
  },
  {
    path: '/',
    name: 'layout',
    redirect: '/home',
    component: () => import('../layout/Layout'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/Home')
      }
      // {
      //   path: '/department',
      //   name: 'department',
      //   component: () => import('../views/system/department/department'),
      //   meta: {
      //     title: '机构管理'
      //   }
      // },
      // {
      //   path: '/userList',
      //   name: 'userList',
      //   component: () => import('../views/system/User/UserList'),
      //   meta: {
      //     title: '用户管理'
      //   }
      // },
      // {
      //   path: '/roleList',
      //   name: 'roleList',
      //   component: () => import('../views/system/Role/RoleList'),
      //   meta: {
      //     title: '角色管理'
      //   }
      // },
      // {
      //   path: '/menuList',
      //   name: 'menuList',
      //   component: () => import('../views/system/Menu/MenuList'),
      //   meta: {
      //     title: '权限管理'
      //   }
      // },
      // {
      //   path: '/goodCategory',
      //   name: 'goodCategory',
      //   component: () => import('../views/goods/goodsCategory/goodsCategoryList'),
      //   meta: {
      //     title: '分类管理'
      //   }
      // },
      // {
      //   path: '/systemCode',
      //   name: 'systemCode',
      //   component: () => import('../views/system/config/code'),
      //   meta: {
      //     title: '日志管理'
      //   }
      // },
      // {
      //   path: '/document',
      //   name: 'document',
      //   component: () => import('../views/system/config/systemDocument'),
      //   meta: {
      //     title: '接口文档'
      //   }
      // }
    ]
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  routes
})

// router.addRoute('layout', {
//   path: '/department',
//   name: 'department',
//   component: () => import('../views/system/department/department'),
//   meta: {
//     title: '机构管理'
//   }
// })

export default router
