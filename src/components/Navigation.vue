<template>
  <div id="nav" v-show="show">
    <router-link to="/">Home</router-link> |
    <router-link to="/resume">Resume</router-link>
  </div>
  <slot />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Navigation',
  props: {
    show: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
});
</script>
