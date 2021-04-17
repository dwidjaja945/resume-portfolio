<template>
  <h1>App Information</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  created() {
    const { appName } = this.$route.params;
    if (Array.isArray(appName)) {
      const name = appName.shift();
      if (name) {
        this.appName = name;
      }
    } else {
      this.appName = appName;
    }
  },
  data() {
    return {
      appName: '',
    };
  },
});
</script>
