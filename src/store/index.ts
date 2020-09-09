import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: {
      error: '',
      reserved: false,
      user: {}
    }
  },
  getters: {
  }
})
