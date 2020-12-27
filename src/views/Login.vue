<template>
  <v-container fill-height>
    <v-row justify="space-between" align="center">
      <v-col cols="12" md="5">
        <v-card
          flat
          max-width="420"
          color="rgba(255,255,255,.8)"
          rounded="xl"
          class="pa-12 mx-auto"
        >
          <v-img max-width="200" class="logo mb-2 d-none" src="../assets/img/logo.svg"
      ></v-img>

          <h3 class="text-h3 mb-3 mt-2 font-weight-bold">Sign In</h3>
          <v-form name="form" @submit.prevent="handleLogin">
            <v-row>
              <!-- <v-col cols="12">
                <v-btn
                  type="submit"
                  min-width="230"
                  elevation="0"
                  x-large
                  dark
                  color="#3f7bf0"
                  class="rounded-lg text-none subtitle-2"
                >
                  <i class="fab fa-google fa-lg mr-2"></i>
                  <span>Sign in with Google</span>
                </v-btn>
              </v-col> -->
              <v-col cols="12" class="pb-0">
                <label for="username" class="mb-2 subtitle-2">Username</label>
                <v-text-field
                  v-model="user.username"
                  v-validate="'required'"
                  flat
                  solo
                  :elevation="0"
                  required
                  hide-details
                  class="rounded-lg"
                  name="username"
                ></v-text-field>
                <v-alert
                  v-if="errors.has('username')"
                  outlined
                  type="warning"
                  border="left"
                  class="mt-2 mb-1 py-2"
                >
                  Username is required!
                </v-alert>
              </v-col>
              <v-col cols="12" class="pb-0">
                <label for="password" class="mb-2 subtitle-2">Password</label>
                <v-text-field
                  v-model="user.password"
                  v-validate="'required'"
                  flat
                  solo
                  autocomplete
                  type="password"
                  hide-details
                  class="rounded-lg"
                  name="password"
                ></v-text-field>
                <v-alert
                  v-if="errors.has('password')"
                  outlined
                  type="warning"
                  border="left"
                  class="mt-2 mb-1 py-2"
                >
                  Password is required!
                </v-alert>
              </v-col>
              <v-col cols="12">
                <v-btn
                  type="submit"
                  :loading="loading"
                  elevation="0"
                  x-large
                  dark
                  class="rounded-lg mt-4 subtitle-1 text-none full-width"
                >
                  <span
                    v-show="loading"
                    class="spinner-border spinner-border-sm"
                  ></span>
                  <span>Sign In</span>
                </v-btn>

                <div class="text-right mt-2">
                  <router-link to="/register" class="text-decoration-none subtitle-2 black--text"
                    >Not account? Sign up</router-link
                  >
                </div>
              </v-col>
              <v-col cols="12" v-if="message">
                <v-alert
                  outlined
                  type="warning"
                  border="left"
                  class="mt-2 mb-1 py-2"
                >
                  {{ message }}
                </v-alert>
              </v-col>
            </v-row>
          </v-form>

          <div class="login-shadow"></div>
        </v-card>
      </v-col>
      <v-col cols="12" md="7">
        <v-img max-width="300" class="mx-auto mb-2" src="../assets/img/fox.svg"
      ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import User from '../models/user';

export default {
  name: 'Login',
  data() {
    return {
      user: new User('', ''),
      loading: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/');
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (this.user.username && this.user.password) {
          this.$store.dispatch('auth/login', this.user).then(
            () => {
              this.$router.push('/');
            },
            error => {
              this.loading = false;
              this.message =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
            }
          );
        }
      });
    }
  }
};
</script>
