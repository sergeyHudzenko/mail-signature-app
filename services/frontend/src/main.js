import Vue from 'vue';

import axios from 'axios';
import VueAxios from 'vue-axios';
import store from './store';
import router from './router';
import App from './App.vue';
// import plugins
import './plugins/axios';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import VueCompositionAPI from '@vue/composition-api';
import './helpers/vueMixin.js';

Vue.use(VueCompositionAPI)

Vue.use(VueMaterial)

Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
