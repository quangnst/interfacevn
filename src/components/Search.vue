<template>
  <div>
    <template v-if="products.length == 0">
      <h3 class="text-center text-danger mt-3">Your item not found!!</h3>
    </template>
    <template v-else>
     <Cards :products="products"/>
    </template>
  </div>
</template>

<script>
import Cards from './Cards';
import SearchServices from '../services/search.service';
export default {
  components: {
    Cards
  },
  data() {
    return {
      products: []
    };
  },
  created() {
    this.search();
  },
  computed: {
    keySearch(){
      return this.$route.params.key
    }
  },
  methods: {
    search(){
      this.$store.state.toggle.isLoading = true;
      return SearchServices.searchProducts(this.keySearch).then(
        response => {
          console.log(response)
          this.products = response.data.products;

          this.$store.state.toggle.isLoading = false;
        },
        error => {
          console.log(error);
        }
      );
    }
  },
  watch: {
    '$route.params.key': function () {
      this.search();
    }
  },
};
</script>
