<template>
  <v-card class="card mx-md-2 pb-4">
    <router-link :to="{ name: 'product', params: { id: product._id } }">
      <v-img
        class="card__image"
        :src="product.image"
        :alt="product.name"
      ></v-img>
    </router-link>
    <v-card-title class="pb-0">
      <router-link
        class="text-decoration-none mr-auto"
        :to="{ name: 'product', params: { id: product._id } }"
      >
        <span class="card__title pb-0 subtitle-1">{{ product.name }}</span>
      </router-link>
      <span class="card__price card-text text-danger mb-0 body">
        ${{ product.price }}
      </span>
    </v-card-title>
    <v-card-text class="py-1">
      <v-row align="center" class="mx-0">
        <v-col cols="12" class="d-flex flex-wrap pa-0 pb-3">
          <v-rating
            empty-icon="fal fa-star"
            full-icon="fas fa-star"
            half-icon="fal fa-star-half"
            :value="4.5"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
            class="mr-4"
          ></v-rating>

          <div class="card__rating grey--text">
            4.5 (413)
          </div>
        </v-col>
      </v-row>

      <!-- <div class="card__desc my-2 subtitle-1">
        {{ product.description.substring(0, 50) }}
      </div> -->
    </v-card-text>
    <v-card-actions class="pt-0">
      <v-btn
        small
        elevation="0"
        outlined
        class="mx-2"
        @click="addToCart(product)"
      >
        Add to cart
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import mixins from '@/mixins/mixins';
export default {
  props: ['product'],
  mixins: [mixins]
};
</script>

<style scoped>
.card-title {
  cursor: pointer;
}
</style>
