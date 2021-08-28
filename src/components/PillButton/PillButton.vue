<template>
  <div>
    <Button class="pill" :onclick="props.onclick" >
      <slot />
    </Button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from '@/components/Button/Button.vue';

export default defineComponent({
  setup(props) {
    return { props };
  },
  components: {
    Button
  }
});
</script>

<style lang="scss" scoped>
.pill {
  border-radius: 50px;
  padding: 0.5rem;
  margin: 0.15rem;
  min-width: 5rem;
}

</style>
