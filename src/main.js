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

Vue.use(ElementUI)

Vue.use(Fragment.Plugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
