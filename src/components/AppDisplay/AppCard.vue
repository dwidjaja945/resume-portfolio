<template>
  <router-link
    :class="['appCard', className]"
    :to="to"
  >
    <slot />
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    to: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      required: false
    }
  },
});
</script>

<style lang="scss" scoped>
.appCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  border-radius: 10px;
  box-shadow: 0 0 7px 1px rgba(0, 0, 0, 0.25);
  transition: box-shadow 0.2s ease;
  &:hover {
    box-shadow: 2px 2px 14px 3px rgba(0, 0, 0, 0.25);
  }
  &,
  &:visited {
    color: unset;
  }
}
</style>
