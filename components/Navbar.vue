<template>
  <no-ssr>
    <v-app-bar
      app
      color="white"
      height="70"
    >
      <v-toolbar-title>
        <router-link to="/">
          <img src="~/assets/img/logo.png" width="100" />
        </router-link>
      </v-toolbar-title>
      <v-spacer />
      <div v-if="!currentUser">
        <router-link to="/register" class="mx-4 text-decoration-none">
          Sign Up
        </router-link>
        <router-link to="/login" class="mx-4 text-decoration-none">
          Login
        </router-link>
      </div>

      <div v-else>
        <router-link to="/profile" class="nav-link">
          {{ currentUser.username }}
        </router-link>
        <a class="nav-link" href @click.prevent="logOut"
          ><v-icon>mdi-logout</v-icon> LogOut
        </a>
      </div>
    </v-app-bar>
  </no-ssr>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.localStorage.user;
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
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    }
  }
};
</script>
