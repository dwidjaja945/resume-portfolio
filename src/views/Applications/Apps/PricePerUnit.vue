<template>
  <header>
    <button
      type="button"
      @click="goBack"
    >
      &larr; Go Back
    </button>
    <h1>Price Per Unit</h1>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'pricePerUnit',
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
});
</script>

<style lang="scss" scoped>
header {
  display: grid;
  grid-template-columns: 1fr 6fr 1fr;
}
</style>
