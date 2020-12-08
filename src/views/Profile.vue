<template>
  <div class="container">
    <v-card class="card mx-auto pa-md-8 no-transition mt-3" max-width="800">
      <v-form name="form" @submit.prevent="handleUpdateUser">
        <v-row>
          <v-col cols="12" class="pb-0">
            <upload-images></upload-images>
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
          <v-col cols="12">
            <div class="text-right">
              <v-btn class="primary white--text mt-2" tile dense type="submit">
                Update
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import UserServices from '../services/user.service';
import UploadImages from '../components/UploadImages';
import { mapActions } from 'vuex';

export default {
  name: 'Profile',
  components: {
    UploadImages,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },
  methods: {
    ...mapActions('snackbar', ['showSnack']),
    handleUpdateUser() {
      let newUser = {
        _id: this.currentUser._id,
        username: this.currentUser.username,
        phone: this.currentUser.phone,
        files: this.currentUser.files,
      };
      return UserServices.updateUser(newUser).then(
        (response) => {
          localStorage.setItem('user', JSON.stringify(response.data));

          this.showSnack({
            text: 'Profile Updated!',
            color: 'success',
            timeout: 3500,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};
</script>
