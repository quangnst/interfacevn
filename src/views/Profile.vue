<template>
  <div class="container">
    <v-card class="card mx-auto pa-md-8 no-transition mt-3" max-width="800">
      <v-form name="form" @submit.prevent="handleUpdateUser">
        <v-row>
          <v-col cols="12" class="pb-0">
            <label for="avatar" class="mb-2 d-block subtitle-2">Avatar</label>
            <v-avatar size="80">
              <img
                src="https://cdn.vuetifyjs.com/images/john.jpg"
                alt="John"
              >
            </v-avatar>
          </v-col>
          <v-col cols="12" class="pb-0">
            <label for="username" class="mb-2 subtitle-2">Name</label>
            <v-text-field
              v-model="currentUser.username"
              v-validate="'required'"
              flat
              outlined
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
            <label for="phone" class="mb-2 subtitle-2">Phone</label>
            <v-text-field
              v-model="currentUser.phone"
              flat
              outlined
              :elevation="0"
              required
              hide-details
              class="rounded-lg"
              name="phone"
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="pb-0">
            <label for="email" class="mb-2 subtitle-2">Email</label>
            <v-text-field
              v-model="currentUser.email"
              flat
              outlined
              :elevation="0"
              required
              hide-details
              class="rounded-lg"
              name="email"
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="pb-0">
            <label for="password" class="mb-2 subtitle-2">Password</label>
            <v-text-field
              v-model="currentUser.password"
              flat
              outlined
              :elevation="0"
              required
              hide-details
              class="rounded-lg"
              name="password"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <div class="text-right">
              <v-btn
                class="primary white--text mt-2"
                tile
                dense
                type="submit"
              >
                Update
              </v-btn>
              {{currentUser}}
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import UserServices from "../services/user.service";

export default {
  name: 'Profile',
  data(){
    return {
      
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },
  methods:{
    handleUpdateUser(){
      let newUser = {
        id: this.currentUser.id,
        username: this.currentUser.username
      }
      return UserServices.updateUser(newUser).then(
        (response) => {
          localStorage.setItem('user', JSON.stringify(response.data));
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
};
</script>
