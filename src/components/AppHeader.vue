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
      <router-link to="/"
        ><img class="logo pa-2 pb-0" src="../assets/img/logo.png"
      /></router-link>
    </v-toolbar-title>
    <v-spacer />
    <template v-if="showAdminBoard">
      <router-link to="/admin" class="nav-link">Admin Board</router-link>
    </template>
    <div >
      <router-link
        v-for="category in categories"
        :key="category._id"
        :to="{ name: 'category', params: { category: category.title } }"
        class="mx-4 text-decoration-none"
        >{{ category.title }}</router-link
      >
    </div>
    <v-spacer />

    <template v-if="!currentUser">
      <router-link to="/register" class="nav-link mx-4"> Sign Up </router-link>
      <router-link to="/login" class="nav-link mx-4"> Login </router-link>
    </template>

    <template v-if="currentUser" class="navbar-nav ml-auto">
      <router-link :to="{ name: 'checkout' }" class="mr-1 ml-4">
        <v-badge
          :content="cart.length"
          :color="cart.length > 0 ? 'primary' : 'transparent'"
          overlap
        >
          <v-icon>fal fa-shopping-cart</v-icon>
        </v-badge>
      </router-link>

      <router-link to="/profile" class="mx-4">
        <v-icon>fal fa-user</v-icon>
      </router-link>
      <v-btn text class="mx-4" href @click.prevent="logOut">
        <v-icon>fal fa-sign-out-alt</v-icon>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script>
import CategoriesServices from '../services/categories.service';
export default {
  data() {
    return {
      categories: []
    };
  },
  created() {
    return CategoriesServices.getCategories().then(
      response => {
        this.categories = response.data;
      },
      error => {
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
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_MODERATOR');
      }

      return false;
    },
    cart() {
      return this.$store.getters.getCart;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>
