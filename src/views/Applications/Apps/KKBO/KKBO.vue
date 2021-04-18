<template>
  <div id="kkbo-info" class="kkboRoot">
    <p>
      As of right now, KKBO is under construction.
      I have lots of ideas and features planned for this application,
      but it has been hard to find the time to flesh them out
      while working full time.
    </p>
    <p>
      There isn't much now, but feel free to check out the landing site
      (also under construction) to read more detailed information about
      KKBO.
    </p>
    <Button
      color="secondary"
      component="a"
      href="https://kkbo.io"
      target="_blank"
      rel="noopener noreferrer"
    >
      CHECK OUT KKBO
    </Button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from '@/components/Button/Button.vue';

export default defineComponent({
  name: 'KKBO',
  components: {
    Button
  },
});
</script>

<style lang="scss" scoped>

.kkboRoot {
  text-align: left;
  min-width: 300px;
  width: 50%;
  margin: auto;
}

@media only screen and (max-width: 960px) {
  .kkboRoot {
    width: 75%;
  }
};
</style>
