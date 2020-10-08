import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      username: '',
    }
  },
  getters: {
    getCurrentUser(state){
      return state.currentUser
    }
  },
  mutations: {
    setCurrentUser(state, data){
      state.currentUser = data
    }
  },
  actions: {
  },
  modules: {
  }
})
