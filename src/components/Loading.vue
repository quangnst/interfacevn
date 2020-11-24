<template>
  <div class="loading">
    <v-overlay color="white" opacity=".96" :value="isLoading">
      <v-img width="40" height="20" src="../assets/img/loading.svg" />
    </v-overlay>
  </div>
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
