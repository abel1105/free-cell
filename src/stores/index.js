import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isDragging: false
  },
  mutations: {
    toggleIsDragging(state) {
      state.isDragging = !state.isDragging;
    }
  },
  actions: {}
});
