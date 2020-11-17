<template>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    app
    color="white"
    light
    height="70"
    v-if="currentUser"
  >
    <v-toolbar-title>
      <router-link to="/"> Vuejs </router-link>
    </v-toolbar-title>
    <v-spacer />
    <template v-if="showAdminBoard">
      <router-link to="/admin" class="nav-link">Admin Board</router-link>
    </template>

    <template v-if="showModeratorBoard">
      <router-link to="/mod" class="nav-link mx-4">Moderator Board</router-link>
    </template>
    <router-link v-if="currentUser" to="/user" class="nav-link mx-4"
      >User</router-link
    >
    <router-link v-if="currentUser" to="/products" class="nav-link mx-4"
      >Products</router-link
    >

    <v-spacer />
    <template v-if="!currentUser">
      <router-link to="/register" class="nav-link mx-4"> Sign Up </router-link>
      <router-link to="/login" class="nav-link mx-4"> Login </router-link>
    </template>

    <template v-if="currentUser" class="navbar-nav ml-auto">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            Categories
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="category in categories" :key="category._id">
            <router-link
              tag="a"
              :to="{ name: 'category', params: { category: category.title } }"
              class="nav-link"
              >{{ category.title }}</router-link
            >
          </v-list-item>
        </v-list>
      </v-menu>
      <router-link tag="a" :to="{ name: 'checkout' }" class="nav-link"
        >Cart(<span class="badge badge-light">{{ cart.length }}</span
        >)</router-link
      >

      <router-link to="/profile" class="nav-link mx-4">
        {{ currentUser.username }}
      </router-link>
      <a class="nav-link mx-4" href @click.prevent="logOut"> LogOut </a>
    </template>
  </v-app-bar>
</template>

<script>
import CategoriesServices from "../services/categories.service";
export default {
  data() {
    return {
      categories: [],
    };
  },
  created() {
    return CategoriesServices.getCategories().then(
      (response) => {
        this.categories = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_ADMIN");
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_MODERATOR");
      }

      return false;
    },
    cart() {
      return this.$store.getters.getCart;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>
