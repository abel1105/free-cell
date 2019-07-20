import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    foundation: {
      spade: 0,
      diamond: 0,
      club: 0,
      heart: 0
    },
    isDragging: false
  },
  mutations: {
    toggleIsDragging(state) {
      state.isDragging = !state.isDragging;
    },
    setFoundation(state, type) {
      state.foundation[type] += 1;
    }
  },
  actions: {}
});
