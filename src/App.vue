<template>
  <v-app class="interface-app" :class="[$router.currentRoute.name + '-page']">
    <AppHeader />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from './components/AppHeader';

export default {
  name: 'App',

  components: {
    AppHeader,
  },

  data: () => ({
    //
  }),
};
</script>
