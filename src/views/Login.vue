<template>
  <v-container fill-height>
    <v-row justify="space-between">
      <v-col cols="12" md="5">
        <v-card
          flat
          max-width="400"
          color="rgba(255,255,255,.8)"
          rounded="xl"
          class="pa-12 mx-auto"
        >
          <img class="logo" src="../assets/img/logo.png" />

          <h3 class="text-h3 mb-3 mt-2 font-weight-bold">Sign In</h3>
          <v-form name="form" @submit.prevent="handleLogin">
            <v-row>
              <v-col cols="12">
                <v-btn
                  type="submit"
                  :disabled="loading"
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
              </v-col>
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
                ></v-text-field>
                <div
                  v-if="errors.has('username')"
                  class="alert alert-danger"
                  role="alert"
                >
                  Username is required!
                </div>
              </v-col>
              <v-col cols="12" class="pb-0">
                <label for="password" class="mb-2 subtitle-2">Password</label>
                <v-text-field
                  v-model="user.password"
                  v-validate="'required'"
                  flat
                  solo
                  type="password"
                  hide-details
                  class="rounded-lg"
                ></v-text-field>
                <div
                  v-if="errors.has('password')"
                  class="alert alert-danger"
                  role="alert"
                >
                  Password is required!
                </div>
              </v-col>
              <v-col cols="12">
                <v-btn
                  type="submit"
                  :disabled="loading"
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
              <v-col cols="12" sm="6" v-if="message">
                <div class="alert alert-danger" role="alert">
                  {{ message }}
                </div>
              </v-col>
            </v-row>
          </v-form>

          <div class="login-shadow"></div>
        </v-card>
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
      this.$router.push('/profile');
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
              this.$router.push('/profile');
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
