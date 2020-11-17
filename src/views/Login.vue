<template>
  <v-container fill-height>
    <v-row justify="space-between">
      <v-col cols="8">
        <v-card
          flat
          max-width="400"
          color="rgba(255,255,255,.8)"
          rounded="xl"
          class="pa-12 mr-auto"
        >
          <img
            id="profile-img"
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            class="profile-img-card"
          />

          <h3 class="text-h3">Sign In</h3>
          <v-form name="form" @submit.prevent="handleLogin">
            <v-row>
              <v-col cols="12">
                <label for="username" class="mb-2">Username</label>
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
              <v-col cols="12">
                <label for="password" class="mb-2">Password</label>
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
              <v-col cols="12" sm="6">
                <v-btn type="submit" 
                  :disabled="loading" 
                  min-width="180" 
                  elevation="0" 
                  x-large 
                  dark
                  class="rounded-lg">
                  <span
                    v-show="loading"
                    class="spinner-border spinner-border-sm"
                  ></span>
                  <span>Sign In</span>
                </v-btn>
              </v-col>
              <v-col cols="12" sm="6">
                <div v-if="message" class="alert alert-danger" role="alert">
                  {{ message }}
                </div>
              </v-col>
            </v-row>
          </v-form>

          <div class="login-shadow"></div>
        </v-card>

      </v-col>
      <!-- <v-col cols="6">
        <v-img src="../assets/img/character.png" max-width="500"></v-img>
      </v-col> -->
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

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>
