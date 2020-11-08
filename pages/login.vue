<template>
  <v-app>
    <v-container class="fill-height auth" fluid>
      <v-layout
        align-center
        justify-end
        class="mx-auto"
        style="max-width: 1200px"
      >
        <v-flex class="login-form">
          <v-card light="light" class="rounded-0">
            <v-card-text class="pa-8">
              <div class="my-2 text-center">
                <img src="../assets/img/logo.png" width="180" class="mx-auto" />
              </div>
              <v-form class="pb-4">
                <v-text-field
                  v-model.trim="user.username"
                  light
                  outlined
                  large
                  hide-details="auto"
                  append-icon="mdi-lock"
                  label="Username"
                  type="text"
                  class="mt-4 rounded-0"
                ></v-text-field>
                <v-text-field
                  v-model.trim="user.password"
                  light
                  outlined
                  large
                  hide-details="auto"
                  append-icon="mdi-lock"
                  label="Password"
                  type="password"
                  class="mt-4 rounded-0"
                ></v-text-field>

                <!-- <p
                    v-if="errorsAuth"
                    class="red--text text-center subtitle-2 mt-2 mb-0"
                  >
                    {{ errorsAuth }}
                  </p> -->
                <div class="text-center">
                  <v-btn
                    x-large
                    @click="login"
                    text
                    class="primary text-h6 white--text px-12 mt-8 text-capitalize rounded-0"
                    >Login</v-btn
                  >
                </div>
              </v-form>
            </v-card-text>
          </v-card>

          <div class="extras text-right mt-5">
            <v-btn text @click="showPasswordReset = true"
              >Forgot Password</v-btn
            >
            <v-btn text @click="$router.push({ name: 'register' })"
              >Create an Account</v-btn
            >
          </div>
        </v-flex>
      </v-layout>
      <!-- <PasswordReset
        v-if="showPasswordReset"
        @close="togglePasswordReset()"
      ></PasswordReset> -->
    </v-container>
  </v-app>
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
        username: "",
        password: ""
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
      console.log(this.user);
      this.loading = true;
      this.$store.dispatch("auth/login", this.user).then(
        () => {
          this.$router.push("/profile");
        },
        error => {
          console.log(error);
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
