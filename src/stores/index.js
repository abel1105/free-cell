import Vue from 'vue';
import Vuex from 'vuex';
import { getRandomCardsStack } from '@/helpers/cards';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    stacks: getRandomCardsStack()
  },
  mutations: {},
  actions: {}
});
