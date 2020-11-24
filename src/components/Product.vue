<template>
  <div class="products__detail">
    <v-container fill-height>
      <div class="row">
        <div class="col-md-5 col-sm-5 col-xs-12">
          <v-carousel height="700">
            <v-carousel-item :src="product.image"> </v-carousel-item>
            <v-carousel-item :src="product.image"> </v-carousel-item>
            <v-carousel-item :src="product.image"> </v-carousel-item>
            <v-carousel-item :src="product.image"> </v-carousel-item>
          </v-carousel>
        </div>
        <div class="col-md-7 col-sm-7 col-xs-12">
          <div class="pl-md-6">
            <p class="display-1 mb-0">{{ product.name }}</p>
            <v-card-actions class="pa-0">
              <p class="headline font-weight-light pt-3">
                ${{ product.price }}
              </p>
              <v-spacer></v-spacer>
              <v-rating
                class=""
                background-color="warning lighten-3"
                color="warning"
                dense
              ></v-rating>
            </v-card-actions>
            <p class="subtitle-1 font-weight-thin">
              {{ product.description }}
            </p>
            <p class="title">SIZE</p>
            <v-radio-group>
              <v-radio label="XS" value="XS"></v-radio>
              <v-radio label="S" value="s"></v-radio>
              <v-radio label="M" value="m"></v-radio>
              <v-radio label="L" value="l"></v-radio>
              <v-radio label="XL" value="xl"></v-radio>
            </v-radio-group>
            
            <v-btn
              class="primary white--text"
              outlined
              tile
              dense
              @click="addToCart(product)"
              ><v-icon class="mr-2">fal fa-cart-plus</v-icon> ADD TO CART</v-btn
            >
            <v-btn class="ml-4" outlined tile>ADD TO WISHLIST</v-btn>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import ProductsServices from "../services/products.service";
import mixins from "@/mixins/mixins";
export default {
  props: ["id"],
  mixins: [mixins],
  data() {
    return {
      product: {},
    };
  },
  created() {
    this.$store.state.toggle.isLoading = true;
    return ProductsServices.getProductsById(this.id).then(
      (response) => {
        this.product = response.data;
        this.$store.state.toggle.isLoading = false;
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    checkout(e) {
      e.preventDefault();
      this.$router.push({ name: "checkout" });
    },
  },
};
</script>

<style>
</style>