import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: function () {
    return {
      inputKey: '',
      tokenString: '',
      userId: '',
      alphabetArr: 'abcdefghijklmnopqrstuvwxyz'.split(''),
    }
  },
  mutations: {
    updateInputKey(state, inputKey) {
      state.inputKey = inputKey
    },

    settingLoginData(state, loginData) {

      state.userId = loginData.user_id
      state.tokenString = loginData.tokenString

    },

    deleteLoginData(state) {
      state.userId = ''
      state.tokenString = ''
    }
  }
})
