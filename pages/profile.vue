<template>
  <section class="section">
    <div class="container">
      <h2 class="title">My Profile</h2>
      <div class="content">
        <p>
          <strong>Username:</strong>
          {{ currentUser }}
        </p>
        <p>
          <strong>Email:</strong>
          {{ currentUser }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  // middleware: "auth",
  computed: {
    currentUser() {
      return this.$store.state.localStorage.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>
