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
                :value="rating"
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
            <v-card-title>
              <!-- <span class="headline">Comments:</span> -->
            </v-card-title>
            <v-card-text class="pb-0">
              <v-container class="pb-0">
                <v-row>
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
                      label="Comments*"
                      required
                      outlined
                      hide-details
                      v-model="comments"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" class="pa-0 mt-1 text-right">
                    <v-btn color="blue darken-1" text @click="sendComment">
                      Send comment
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
          <v-list three-line>
            <template v-for="(item, index) in items">
              <v-list-item :key="index">
                <v-list-item-avatar>
                  <v-img :src="item.avatar"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-rating
                    class=""
                    background-color="warning lighten-3"
                    color="warning"
                    dense
                    size="14"
                    :value="4"
                    readonly
                  ></v-rating>
                  <v-list-item-title v-html="item.title"></v-list-item-title>
                  <v-list-item-subtitle
                    v-html="item.subtitle"
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
      rating: 5,
      comments: '',
      product: {},
      items: [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
          subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui',
          subtitle:
            '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?'
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Birthday gift',
          subtitle:
            '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?'
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Recipe to try',
          subtitle:
            '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.'
        }
      ]
    };
  },
  created() {
    this.$store.state.toggle.isLoading = true;
    return ProductsServices.getProductsById(this.id).then(
      response => {
        this.product = response.data;
        this.$store.state.toggle.isLoading = false;
      },
      error => {
        console.log(error);
      }
    );
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    checkout(e) {
      e.preventDefault();
      this.$router.push({ name: 'checkout' });
    },
    sendComment() {
      console.log(this.currentUser);
      let sendRating = {
        user_id: this.currentUser._id,
        productId: this.id,
        rate: this.rating,
        comments: this.comments
      };
      return ProductsServices.addReview(sendRating).then(
        response => {
          console.log(response.data);
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
