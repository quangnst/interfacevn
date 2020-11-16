import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import { router } from './router';
import store from './store';
import Vuex from 'vuex';
import VeeValidate from 'vee-validate';

import '@/assets/scss/app.scss';

Vue.config.productionTip = false

Vue.use(Vuex);
Vue.use(VeeValidate);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
