<template>
  <div>
    <Cards :products="products" />
    <div class="text-center">
      <v-pagination
        next-icon="fal fa-angle-right"
        prev-icon="fal fa-angle-left"
        v-model="page"
        :length="pages"
        @input="checkPage"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import Cards from './Cards';
import ProductsServices from '../services/products.service';
export default {
  components: {
    Cards
  },
  data() {
    return {
      products: [],
      currentPage: '',
      page: 1,
      pages: 0,
      prevUrl: '',
      nextUrl: ''
    };
  },
  created() {
    this.$store.state.toggle.isLoading = true;
    return ProductsServices.getProducts().then(
      response => {
        this.products = response.data.products;
        this.currentPage = response.data.currentPage;
        this.pages = response.data.pages;
        this.nextUrl = response.data.nextUrl;
        this.prevUrl = response.data.prevUrl;

        this.$store.state.toggle.isLoading = false;
      },
      error => {
        console.log(error);
      }
    );
  },
  methods: {
    checkPage() {
      this.$store.state.toggle.isLoading = true;
      this.$vuetify.goTo(0);
      let url = `http://localhost:8080/api/products?page=${this.page - 1}`;
      return ProductsServices.getProductsByUrl(url).then(
        response => {
          this.products = response.data.products;
          this.currentPage = response.data.currentPage;
          this.pages = response.data.pages;
          this.nextUrl = response.data.nextUrl;
          this.prevUrl = response.data.prevUrl;

          this.$store.state.toggle.isLoading = false;
        },
        error => {
          console.log(error);
        }
      );
    }
  }
};
</script>

<style scoped></style>
