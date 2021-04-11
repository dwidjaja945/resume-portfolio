<template>
  <div class="root" v-if="!isMe">
    <h1>
      This is <b>NOT</b> a public facing path.
    </h1>
    <p>
      If you found this page by accident, are are snooping around,
      please return to <router-link to="/">home</router-link>.
    </p>
    <div class="links">
      <router-link to="/">Go Home</router-link>
      <router-link :to="Paths.PRIVATE_EXPENSE">Proceed</router-link>
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
