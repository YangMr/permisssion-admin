import Vue from 'vue'
import Vuex from 'vuex'
import Menu from './modules/menu'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  modules: {
    Menu
  }
})
