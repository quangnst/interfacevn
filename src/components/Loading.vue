<template>
  <v-overlay color="white" opacity=".9" :value="isLoading">
    <v-img width="40" height="20" src="../assets/img/loading.svg" />
  </v-overlay>
  <!-- Loading -->
</template>

<script>
export default {
  name: 'Loading',
  data() {
    return {
    };
  },
  props: ['isLoading'],
};
</script>
