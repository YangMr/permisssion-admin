import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './permission'
import './directive/buttonPermission'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 解决menu菜单收起文字不隐藏的问题
import Fragment from 'vue-fragment'

// 引入iconfont字体图标样式
import './assets/icon/iconfont.css'

Vue.use(ElementUI)

Vue.use(Fragment.Plugin)

Vue.config.productionTip = false

console.log('old', router.getRoutes())

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
