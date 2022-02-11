import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: function () {
    return {
      inputKey: "",
      count: 0,
    };
  },
  mutations: {
    updateInputKey(state, inputKey) {
      state.inputKey = inputKey;
    },
  },
});
