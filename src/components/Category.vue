<template>
  <Cards :products="products" />
</template>

<script>
import Cards from "./Cards";
import CategoriesServices from "../services/categories.service";
export default {
  props: ["category"],
  data() {
    return {
      products: []
    };
  },
  components: {
    Cards,
  },
  created() {
    this.fetch();
  },
  watch: {
    $route(to, from) {
      if (from.params.category !== to.params.category) {
        this.fetch();
      }
    },
  },
  methods: {
    fetch() {
      this.$store.state.toggle.isLoading = true;
      return CategoriesServices.getCategoriesDetails(this.category).then(
        (response) => {
          this.$store.state.toggle.isLoading = false;
          this.products = response.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};
</script>

<style scoped>
</style>