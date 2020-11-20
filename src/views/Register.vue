<template>
  <v-container fill-height>
    <v-row justify="space-between">
      <v-col cols="12" md="5">
        <v-card
          flat
          max-width="420"
          color="rgba(255,255,255,.8)"
          rounded="xl"
          class="pa-12 mx-auto"
        >
          <img class="logo" src="../assets/img/logo.png" />

          <h3 class="text-h3 mb-3 mt-2 font-weight-bold">Sign Up</h3>
          <v-form name="form" @submit.prevent="handleRegister">
            <v-row>
              <v-col cols="12" class="pb-0">
                <label for="username" class="mb-2 subtitle-2">Username</label>
                <v-text-field
                  v-model="user.username"
                  v-validate="'required|min:3|max:20'"
                  flat
                  solo
                  :elevation="0"
                  required
                  hide-details
                  class="rounded-lg"
                  name="username"
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
                <label for="username" class="mb-2 subtitle-2">Email</label>
                <v-text-field
                  v-model="user.email"
                  v-validate="'required|email|max:50'"
                  type="email"
                  flat
                  solo
                  :elevation="0"
                  required
                  hide-details
                  class="rounded-lg"
                  name="email"
                ></v-text-field>
                <div
                  v-if="errors.has('email')"
                  class="alert alert-danger"
                  role="alert"
                >
                  Email is required!
                </div>
              </v-col>
              <v-col cols="12" class="pb-0">
                <label for="password" class="mb-2 subtitle-2">Password</label>
                <v-text-field
                  v-model="user.password"
                  v-validate="'required|min:6|max:40'"
                  flat
                  solo
                  autocomplete
                  type="password"
                  hide-details
                  class="rounded-lg"
                  name="password"
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
                  <span>Sign Up</span>
                </v-btn>


                <div class="text-right mt-2">
                  <router-link to="/login" class="text-decoration-none subtitle-2 black--text"
                    >Back to Login in</router-link
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
  name: 'Register',
  data() {
    return {
      user: new User('', '', ''),
      loading: false,
      submitted: false,
      successful: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/register', this.user).then(
            data => {
              this.message = data.message;
              this.successful = true;
            },
            error => {
              this.message =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      });
    }
  }
};
</script>
