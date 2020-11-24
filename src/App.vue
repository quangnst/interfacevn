<template>
  <v-app class="interface-app" :class="[$router.currentRoute.name + '-page']">
    <AppHeader v-if="user"/>

    <Loading :isLoading="isLoading" />
    <SnackBar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import AppHeader from './components/AppHeader';
import Loading from './components/Loading';
import SnackBar from './components/SnackBar';

export default {
  name: 'App',

  components: {
    AppHeader,
    Loading,
    SnackBar
  },
  computed: {
      ...mapState({
        isLoading: state => state.toggle.isLoading,
        user: state => state.auth.user
      }),
  },

  data: () => ({
    //
  }),
};
</script>
