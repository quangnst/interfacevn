<template>
  <v-card class="card mx-2" max-width="374">
    <router-link tag="a" :to="{ name: 'product', params: { id: product._id } }">
      <v-img
        class="card__image"
        :src="product.image"
        :alt="product.name"
      ></v-img>
    </router-link>
    <v-card-title class="card__title">{{ product.name }}</v-card-title>

    <v-card-text>
      <v-row align="center" class="mx-0">
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
        ></v-rating>

        <div class="card__rating grey--text ml-4">
          4.5 (413)
        </div>
      </v-row>

      <div class="card__category my-4 subtitle-1">
        Category: {{ product.category }}
      </div>

      <div class="card__desc">{{ product.description.substring(0, 50) }}</div>

      <p class="card__price card-text text-danger">${{ product.price }}</p>
    </v-card-text>
    <v-card-actions>
      <router-link
        class=""
        :to="{ name: 'product', params: { id: product._id } }"
        >Desciption</router-link
      >
      <v-btn class="" @click="addToCart(product)">
        Buy Now
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
