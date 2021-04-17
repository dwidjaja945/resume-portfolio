<template>
  <h1>App Information</h1>
  <component :is="appName" />
</template>

<script lang="ts">
import { Applications } from '@/router/Applications';
import PricePerUnit from '@/views/Applications/Apps/PricePerUnit.vue';
import { defineComponent } from 'vue';

type Component =
| typeof PricePerUnit;

interface Data {
  appName: Component | null;
}

export default defineComponent({
  created() {
    const { appName } = this.$route.params;
    let name = '';
    if (Array.isArray(appName)) {
      const currentName = appName.shift();
      if (currentName) {
        name = currentName;
      }
    } else {
      name = appName;
    }
    switch (name) {
    case Applications.pricePerUnit.name:
      this.appName = PricePerUnit;
      break;
    default:
      break;
    };
  },
  data(): Data {
    return {
      appName: null,
    };
  },
});
</script>
