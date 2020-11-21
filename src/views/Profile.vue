<template>
  <div class="container">
    <v-card class="card mx-auto pa-md-8 no-transition mt-3" max-width="1000">
      <header class="jumbotron">
        <h3>
          <strong>{{currentUser.username}}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Id:</strong>
        {{currentUser.id}}
      </p>
      <p>
        <strong>Email:</strong>
        {{currentUser.email}}
      </p>
      <strong>Authorities:</strong>
      <ul>
        <li v-for="(role,index) in currentUser.roles" :key="index">{{role}}</li>
      </ul>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>