import Vue from 'vue';
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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
