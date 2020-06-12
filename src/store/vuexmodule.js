export default {
  state: {
    myNewFirstMessage: ' this message is from new vuexmodule'
  },
  mutations: {

  },
  actions: {

  },
  getters: {
    getMyFirstMessage(state) {
      return state.myNewFirstMessage
    }
  }
}
