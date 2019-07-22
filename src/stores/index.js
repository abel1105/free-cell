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
    isLock: false,
    isDragging: false,
    log: []
  },
  getters: {
    lastLog(state) {
      return state.log[state.log.length - 1];
    }
  },
  mutations: {
    toggleIsLock(state) {
      state.isLock = !state.isLock;
    },
    toggleIsDragging(state) {
      state.isDragging = !state.isDragging;
    },
    setFoundation(state, type) {
      state.foundation[type] += 1;
    },
    addLog(state, data) {
      state.log.push({
        foundation: JSON.stringify(state.foundation),
        data
      });
    },
    setLog(state, { foundation }) {
      state.log.pop();
      state.foundation = foundation;
    },
    restart(state) {
      state.log = [];
      state.foundation = {
        spade: 0,
        diamond: 0,
        club: 0,
        heart: 0
      };
    }
  },
  actions: {}
});
