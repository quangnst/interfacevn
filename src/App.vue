<template>
  <v-app class="interface-app" :class="[$router.currentRoute.name + '-page']">
    <AppHeader />

    <Loading :isLoading="isLoading" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import AppHeader from './components/AppHeader';
import Loading from './components/Loading';

export default {
  name: 'App',

  components: {
    AppHeader,
    Loading
  },
  computed: {
      ...mapState({
        isLoading: state => state.toggle.isLoading
      }),
  },

  data: () => ({
    //
  }),
};
</script>
