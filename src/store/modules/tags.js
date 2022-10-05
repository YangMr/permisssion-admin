/**
 * @author YangLing
 * @date 2022/10/5 08:44
 */
export default {
  namespaced: true,
  state: {
    tags: [
      {
        title: '首页',
        path: '/home',
        name: 'home'
      },
      {
        title: '机构管理',
        path: '/department',
        name: 'department'
      },
      {
        title: '角色管理',
        path: '/roleList',
        name: 'roleList'
      },
      {
        title: '用户管理',
        path: '/userList',
        name: 'userList'
      }
    ],
    // 设置默认选中的tab
    editableTabsValue: 'home',
    // tab的数据源
    editableTabs: [
      {
        title: '首页',
        name: 'home'
      }
    ]
  },
  mutations: {
    removeTags(state, index) {
      state.tags.splice(index, 1)
    },
    getTags(state) {
      const tags = sessionStorage.getItem('tags')
      if (tags) {
        state.editableTabs = JSON.parse(tags)
      }
    },
    setEditValue(state, val) {
      state.editableTabsValue = val
    },
    addTags(state, data) {
      const index = state.editableTabs.findIndex(item => item.name === data.name)
      if (index === -1) {
        state.editableTabs.push(data)
      }
      state.editableTabsValue = data.name

      // 将添加的tags数据存储到本地
      sessionStorage.setItem('tags', JSON.stringify(state.editableTabs))
    },
    closeTags(state, data) {
      state.editableTabs = data
    }
  },
  actions: {}
}
