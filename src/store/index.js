import Vue from 'vue'
import Vuex from 'vuex'
import Menu from './modules/menu'
import Tags from './modules/tags'
import User from './modules/user'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  modules: {
    Menu,
    Tags,
    User
  }
})
