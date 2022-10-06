/**
 * @author YangLing
 * @date 2022/10/6 14:39
 */
import Vue from 'vue'
import store from '../store'

Vue.directive('permission', {
  inserted(el, binding) {
    // 获取当前按钮所绑定的权限
    const currentValue = binding.value
    // 获取后台所返回当前用户所有的按钮权限
    const authList = store.getters.authList
    // 判断当前按钮所绑定的权限是否在后台所返回的所有按钮权限中
    const hasPermission = authList.includes(currentValue)
    if (!hasPermission) {
      el.style.dispaly = 'none'
      setTimeout(() => {
        el.parentNode.removeChild(el)
      }, 0)
    }
  }
})
