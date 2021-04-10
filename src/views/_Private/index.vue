<template>
  <div class="root" v-if="!isMe">
    <h1>Are you lost?</h1>
    <div class="links">
      <router-link to="/">Go Home</router-link>
      <router-link :to="Paths.PRIVATE_EXPENSE">No</router-link>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Paths } from '@/router/Paths';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      Paths,
    };
  },
});
</script>

<style lang="scss" scoped>
.links {
  display: grid;
  grid-auto-columns: 1fr 1fr;
  grid-gap: 2rem;
}
</style>
