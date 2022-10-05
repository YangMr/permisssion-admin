import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

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

/**
 *
 * tags view 功能
 *  1. 在vuex中定义存储数据源的变量
 *  2. 监听路由， 当路由发生变化的时候， 将路由的信息（name, path ，meta.title） 添加到vuex的数据源
 *  3. 添加的时候判断 要添加的数据在vuex里面是否存储， 如果不存在则进行添加
 *  4. 将数据存储到本地
 *
 *  5. 这个时候vuex里面就有数据源， 接下来我们需要在tags这个组件去渲染数据
 *  6. 点击tags的时候，我们需要进行路由跳转
 *
 */
