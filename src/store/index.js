import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth.module';
import { products } from './products.module';
import { toggle } from './toggle.module';
import { snackbar } from './snackbar.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    products,
    toggle,
    snackbar
  }
});
