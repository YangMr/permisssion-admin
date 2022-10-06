/**
 * @author YangLing
 * @date 2022/10/4 16:16
 */
import loginApi from '../../api/login'

export default {
  namespaced: true,
  state: {
    // 侧边栏展示或收起的状态 false 展开 true 收起
    isCollapse: false,
    // 菜单的数据源
    menuList: [
      // {
      //   children: [
      //     {
      //       children: [],
      //       code: 'sys:dept',
      //       createTime: 1586703509000,
      //       icon: 'el-icon-copy-document',
      //       id: 33,
      //       isHome: 0,
      //       label: '机构管理',
      //       name: 'department',
      //       orderNum: 2,
      //       parentId: 17,
      //       path: '/department',
      //       remark: '机构管理',
      //       type: '1',
      //       updateTime: 1586337139000,
      //       url: '/system/department/department'
      //     },
      //     {
      //       children: [],
      //       code: 'sys:user',
      //       createTime: 1691464271000,
      //       icon: 'el-icon-s-custom',
      //       id: 18,
      //       isHome: 0,
      //       label: '用户管理',
      //       name: 'userList',
      //       orderNum: 3,
      //       parentId: 17,
      //       path: '/userList',
      //       type: '1',
      //       updateTime: 1691565988000,
      //       url: '/system/User/UserList'
      //     },
      //     {
      //       children: [],
      //       code: 'sys:role',
      //       createTime: 1691464271000,
      //       icon: 'el-icon-rank',
      //       id: 23,
      //       isHome: 0,
      //       label: '角色管理',
      //       name: 'roleList',
      //       orderNum: 4,
      //       parentId: 17,
      //       path: '/roleList',
      //       type: '1',
      //       updateTime: 1691565988000,
      //       url: '/system/Role/RoleList'
      //     },
      //     {
      //       children: [],
      //       code: 'sys:menu',
      //       createTime: 1691464271000,
      //       icon: 'el-icon-menu',
      //       id: 28,
      //       isHome: 0,
      //       label: '权限管理',
      //       name: 'menuList',
      //       orderNum: 5,
      //       parentId: 17,
      //       path: '/menuList',
      //       type: '1',
      //       updateTime: 1691565988000,
      //       url: '/system/Menu/MenuList'
      //     }
      //   ],
      //   code: 'sys:manage',
      //   createTime: 1691464271000,
      //   icon: 'el-icon-document',
      //   id: 17,
      //   isHome: 0,
      //   label: '系统管理',
      //   orderNum: 1,
      //   parentId: 0,
      //   path: '/system',
      //   type: '0',
      //   updateTime: 1691565988000
      // },
      // {
      //   children: [
      //     {
      //       children: [],
      //       code: 'sys:goodsCategory',
      //       createTime: 1586703272000,
      //       icon: 'el-icon-s-data',
      //       id: 36,
      //       isHome: 0,
      //       label: '分类管理',
      //       name: 'goodCategory',
      //       orderNum: 1,
      //       parentId: 34,
      //       path: '/goodCategory',
      //       type: '1',
      //       updateTime: 1586683590000,
      //       url: '/goods/goodsCategory/goodsCategoryList'
      //     },
      //     {
      //       children: [],
      //       code: 'sys:goodsBrand',
      //       createTime: 1586683924000,
      //       icon: 'el-icon-tickets',
      //       id: 37,
      //       isHome: 0,
      //       label: '品牌管理',
      //       name: 'goodsBrand',
      //       orderNum: 2,
      //       parentId: 34,
      //       path: '/goodsBrand',
      //       type: '1',
      //       updateTime: 1586683924000,
      //       url: '/goods/goodsBrand/goodsBrandList'
      //     }
      //   ],
      //   code: 'sys:goods',
      //   createTime: 1586702987000,
      //   icon: 'el-icon-picture',
      //   id: 34,
      //   isHome: 0,
      //   label: '商品管理',
      //   name: '',
      //   orderNum: 2,
      //   parentId: 0,
      //   path: '/goods',
      //   type: '0',
      //   updateTime: 1586683323000
      // },
      // {
      //   children: [
      //     {
      //       children: [],
      //       code: 'sys:systemCode',
      //       createTime: 1587012282000,
      //       icon: 'el-icon-files',
      //       id: 43,
      //       isHome: 0,
      //       label: '代码生成',
      //       name: 'systemCode',
      //       orderNum: 0,
      //       parentId: 42,
      //       path: '/systemCode',
      //       type: '1',
      //       updateTime: 1586684646000,
      //       url: '/system/config/code'
      //     },
      //     {
      //       children: [],
      //       code: 'sys:document',
      //       createTime: 1586748705000,
      //       icon: 'el-icon-s-operation',
      //       id: 77,
      //       isHome: 0,
      //       label: '接口文档',
      //       name: 'document',
      //       orderNum: 0,
      //       parentId: 42,
      //       path: '/document',
      //       type: '1',
      //       updateTime: 1586748705000,
      //       url: '/system/config/systemDocument'
      //     }
      //   ],
      //   code: 'sys:systenConfig',
      //   createTime: 1586703003000,
      //   icon: 'el-icon-receiving',
      //   id: 42,
      //   isHome: 0,
      //   label: '系统工具',
      //   name: '',
      //   orderNum: 3,
      //   parentId: 0,
      //   path: '/systenConfig',
      //   type: '0',
      //   updateTime: 1586684441000
      // }
    ],
    routerList: [],
    authList: []
  },
  mutations: {
    setCollapse(state) {
      state.isCollapse = !state.isCollapse
    },
    setMenuList(state, menuList) {
      state.menuList = menuList
    },
    setRouterList(state, routerList) {
      state.routerList = routerList
    },
    setAuthList(state, authList) {
      state.authList = authList
    },
    // 动态添加路由
    dynamicRouter(state, router) {
      // 获取静态路由/原来的路由
      // const routes = router.options.routes
      // console.log('old', routes)
      // 获取后台返回的路由表
      const routerList = state.routerList
      console.log('routerList', routerList)
      routerList.forEach(item => {
        if (item.path === '/document') {
          item.name = item.path.replace('/', '')
        }
        const obj = {
          path: item.path,
          name: item.name,
          component: resolve => require([`@/views${item.url}.vue`], resolve),
          meta: {
            title: item.label
          }
        }
        // routes[1].children.push(obj)
        router.addRoute('layout', obj)
      })
      // router.addRoute({
      //   path: '*',
      //   redirect: '/404'
      // })
      // router.addRoutes()
      // console.log('zg', router.getRoutes())
      // console.log('zg1', router.options.routes)
    }
  },
  actions: {
    async getMenuList({ commit }, router) {
      try {
        const response = await loginApi.getPermissionList()
        commit('setMenuList', response.data.menuList)
        commit('setRouterList', response.data.routerList)
        commit('setAuthList', response.data.authList)
        commit('dynamicRouter', router)
        return response
      } catch (e) {
        console.log(e.message)
      }
    }
  }
}
