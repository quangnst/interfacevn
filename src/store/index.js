import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth.module';
import { products } from './products.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    products
  }
});
