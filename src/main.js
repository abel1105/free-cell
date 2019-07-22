import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import { MdIcon } from 'vue-material/dist/components';
import App from './App.vue';
import router from './router';
import store from './stores';
import 'vue-material/dist/vue-material.min.css';
import 'normalize.css';
import Card from './components/Card';

Vue.config.productionTip = false;

Vue.use(MdIcon);

Vue.component('Card', Card);

Vue.use(VueAnalytics, {
  id: 'UA-142485991-1',
  router
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
