import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import vuexmodule from './vuexmodule'
export default new Vuex.Store({
  modules: {
    vuexmodule
  }
})
