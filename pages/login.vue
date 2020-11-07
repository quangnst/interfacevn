<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h2 class="title has-text-centered">Welcome back!</h2>

          <!-- <Notification :message="error" v-if="error" /> -->

          <form method="post" @submit.prevent="login">
            <div class="field">
              <label class="label">Username</label>
              <div class="control">
                <input
                  type="text"
                  class="input"
                  name="username"
                  v-model="user.username"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  type="password"
                  class="input"
                  name="password"
                  v-model="user.password"
                />
              </div>
            </div>
            <div class="control">
              <button type="submit" class="button is-dark is-fullwidth">
                Log In
              </button>
            </div>
          </form>
          <div class="has-text-centered" style="margin-top: 20px">
            <p>
              Don't have an account?
              <nuxt-link to="/register">Register</nuxt-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import Notification from "~/components/Notification";

import User from "../models/user";

export default {
  components: {
    Notification
  },

  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      loading: false,
      message: ""
    };
  },
  computed: mapState({
    loggedIn: "auth/loggedIn"
  }),
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    login() {
      console.log(this.user)
      this.loading = true;
      this.$store.dispatch("auth/login", this.user).then(
        () => {
          this.$router.push("/profile");
        },
        error => {
          console.log(error)
          this.loading = false;
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    }
  }
};
</script>
