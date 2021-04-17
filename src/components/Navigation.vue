<template>
  <div id="nav" v-show="show">
    <router-link :to="Paths.HOME">Home</router-link> |
    <router-link :to="Paths.RESUME">Resume</router-link> |
    <router-link :to="Paths.APPLICATIONS" >Applications</router-link> |
    <router-link :to="Paths.CONTACT">Contact</router-link>
  </div>
  <slot />
</template>

<script lang="ts">
import { Paths } from '@/router/Paths';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Navigation',
  computed: {
    Paths() {
      return Paths;
    },
  },
  props: {
    show: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
});
</script>
