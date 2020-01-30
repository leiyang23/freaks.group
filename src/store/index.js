import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    is_login:false
  },
  mutations: {
    login(state,){
      state.is_login = true
    },
    logout(state,){
      state.is_login = false
    }
  },
  actions: {
  },
  getters:{
    get_login_status(state){
      return state.is_login
    }
  },
  modules: {
  }
})
