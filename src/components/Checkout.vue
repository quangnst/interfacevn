<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div v-if="cart.length == 0">
          <h3 class="text-center text-danger">Your Cart is Empty !</h3>
        </div>
        <div v-else>
          <v-card class="card mx-auto pa-md-8 no-transition" max-width="1000">
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">SubTotat</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="item in cart" :key="item.id">
                    <td>
                      <v-avatar
                        rounded="0"
                        class="mr-3 my-5"
                        width="90"
                        height="120"
                      >
                        <img :src="item.image" />
                      </v-avatar>
                      <strong class="subtitle-1">{{ item.name }}</strong>
                    </td>
                    <td>
                      <span class="accent--text">${{ item.price }}</span>
                    </td>
                    <td>{{ item.qty }}</td>
                    <td>${{ item.subtotal }}</td>
                    <td>
                      <v-btn icon class="mr-1" @click="action('min', item)">
                        <v-icon small>far fa-minus</v-icon>
                      </v-btn>
                      <v-btn icon class="mr-1" @click="action('clear', item)">
                        <v-icon small>far fa-trash-alt</v-icon>
                      </v-btn>
                      <v-btn icon class="mr-1" @click="action('add', item)">
                        <v-icon small>far fa-plus</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <div class="text-right pa-2">
              <h4>Total: ${{ total }}</h4>
              <v-btn
                class="primary white--text mt-2"
                tile
                dense
                @click="checkout"
              >
                Checkout
              </v-btn>
            </div>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    // let total = this.total;
  },
  computed: {
    cart() {
      return this.$store.getters.getCart;
    },
    total() {
      let som = 0;
      this.cart.map(item => {
        som += item.subtotal;
      });
      return som;
    }
  },
  methods: {
    checkout() {},
    action(event, item) {
      switch (event) {
        case 'add':
          item.qty++;
          item.subtotal = item.price * item.qty;
          this.$store.commit('setQuantity', item);
          this.$store.commit('setPrice', item);
          localStorage.setItem('cart', JSON.stringify(this.cart));
          break;
        case 'min':
          item.qty--;
          item.subtotal = item.price * item.qty;
          this.$store.commit('setQuantity', item);
          this.$store.commit('setPrice', item);
          localStorage.setItem('cart', JSON.stringify(this.cart));
          if (item.qty === 0) this.clearFromCart(item);
          break;
        case 'clear':
          this.clearFromCart(item);
          break;
        default:
          break;
      }
    },
    clearFromCart(product) {
      let item = this.cart.find(item => {
        return item.id === product.id;
      });
      let index = this.cart.indexOf(item);
      this.cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  }
};
</script>

<style></style>
