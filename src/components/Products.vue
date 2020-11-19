<template>
  <div>
    <Cards :products="products" />
    <p class="text-center mb-0">{{ currentPage + 1 }} / {{ pages }}</p>
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: prevUrl === '' }">
        <button class="page-link" @click="checkPage(prevUrl)">Previous</button>
      </li>
      <li class="page-item" :class="{ disabled: nextUrl === '' }">
        <button class="page-link" @click="checkPage(nextUrl)">Next</button>
      </li>
    </ul>
  </div>
</template>

<script>
import Cards from "./Cards";
import ProductsServices from "../services/products.service";
export default {
  components: {
    Cards,
  },
  data() {
    return {
      products: [],
      currentPage: "",
      pages: "",
      prevUrl: "",
      nextUrl: "",
    };
  },
  created() {
    this.$store.state.toggle.isLoading = true;
    return ProductsServices.getProducts().then(
      (response) => {
        this.products = response.data.products;
        this.currentPage = response.data.currentPage;
        this.pages = response.data.pages;
        this.nextUrl = response.data.nextUrl;
        this.prevUrl = response.data.prevUrl;

        this.$store.state.toggle.isLoading = false;
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    checkPage(url) {
      return ProductsServices.getProductsByUrl(url).then(
        (response) => {
          this.products = response.data.products;
          this.currentPage = response.data.currentPage;
          this.pages = response.data.pages;
          this.nextUrl = response.data.nextUrl;
          this.prevUrl = response.data.prevUrl;
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