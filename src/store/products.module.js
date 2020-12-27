import ProductsServices from '../services/products.service';

export const products = {
  state: {
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    charge: {},
    product: {}
  },
  mutations: {
    setCart: (state, payload) => {
      state.cart.push(payload);
    },
    setQuantity: (state, payload) => {
      let item = state.cart.find(product => {
        return product.id === payload.id;
      });
      item.qty = payload.qty;
    },
    setPrice: (state, payload) => {
      let item = state.cart.find(product => {
        return product.id === payload.id;
      });
      item.subtotal = payload.subtotal;
    },
    setCharge: (state, payload) => {
      state.charge = payload;
    },
    setProduct: (state, payload) => {
      state.product = payload;
    },
    addComment: (state, payload) => {
      state.product.review.unshift(payload);
    }
  },
  actions: {
    getProduct: ({ commit, rootState }, payload) => {
      rootState.toggle.isLoading = true;
      return ProductsServices.getProductsById(payload).then(
        response => {
          commit('setProduct', response.data);

          rootState.toggle.isLoading = false;
        },
        error => {
          console.log(error);
        }
      );
    }
  },
  getters: {
    getCart: state => state.cart,
    getCharge: state => state.charge,
    product: state => state.product
  }
};
