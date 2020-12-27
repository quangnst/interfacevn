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
                :value="getStar"
                readonly
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

      <div class="row">
        <div class="col-md-5 col-sm-5 col-xs-12">
          <v-card elevation="0">
            <v-card-title> </v-card-title>
            <v-card-text class="pb-0">
              <v-container class="pb-0">
                <v-row>
                  <template v-if="!commented">
                    <v-col cols="12" class="pa-0">
                      <v-rating
                        class=""
                        background-color="warning lighten-3"
                        color="warning"
                        dense
                        size="20"
                        v-model="rating"
                      ></v-rating>
                    </v-col>
                    <v-col cols="12" class="px-0 pb-0">
                      <v-textarea
                        label="Comment*"
                        required
                        outlined
                        hide-details
                        v-model="comment"
                      ></v-textarea>
                    </v-col>
                    <v-col cols="12" class="pa-0 mt-1 text-right">
                      <v-btn color="blue darken-1" text @click="sendComment">
                        Send comment
                      </v-btn>
                    </v-col>
                  </template>
                  <template v-else>
                    You have been commented!!
                  </template>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
          <v-list three-line>
            <template v-for="(item, index) in product.review">
              <v-list-item :key="index">
                <v-list-item-avatar>
                  <v-img
                    v-if="item.owner_avatar"
                    :src="item.owner_avatar"
                  ></v-img>

                  <v-avatar size="80" v-else color="red">
                    <span class="white--text headline">{{ nameShort }}</span>
                  </v-avatar>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-rating
                    class=""
                    background-color="warning lighten-3"
                    color="warning"
                    dense
                    size="14"
                    :value="item.star"
                    readonly
                  ></v-rating>
                  <v-list-item-title
                    v-html="item.owner_name"
                  ></v-list-item-title>
                  <v-list-item-subtitle
                    v-html="item.comment"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import ProductsServices from '../services/products.service';
import mixins from '@/mixins/mixins';
export default {
  props: ['id'],
  mixins: [mixins],
  data() {
    return {
      dialog: false,
      rating: 0,
      comment: '',
      commented: false
    };
  },
  created() {
    this.$store.dispatch('getProduct', this.id);
   
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    nameShort() {
      return this.currentUser.username.substring(0, 2);
    },
    getStar() {
      if (!this.product.review) return;
      const result = this.product.review.reduce( ( sum, { star } ) => sum + star , 0)
      const star = Math.ceil(result / this.product.review.length);
      return star;
    },
    product() {
      return this.$store.getters.product;
    },
  },
  methods: {
    checkout(e) {
      e.preventDefault();
      this.$router.push({ name: 'checkout' });
    },
    sendComment() {
      let reviewProduct = {
        owner_name: this.currentUser.username,
        owner_avatar: this.currentUser.avatar,
        product_id: this.id,
        star: this.rating,
        comment: this.comment
      };
      return ProductsServices.addReview(reviewProduct).then(
        response => {
          console.log(response.data);
          this.$store.commit('addComment', response.data);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
};
</script>

<style></style>
