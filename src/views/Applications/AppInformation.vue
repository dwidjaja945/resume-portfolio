<template>
  <main>
    <header>
      <div class="backContainer">
        <Button
          :click="goBack"
        >
          Back
        </Button>
      </div>
      <h1>{{appName}}</h1>
      <span />
    </header>
    <component :is="appComponent" />
  </main>
</template>

<script lang="ts">
import { Applications } from '@/router/Applications';
import PricePerUnit from '@/views/Applications/Apps/PricePerUnit/PricePerUnit.vue';
import KKBO from '@/views/Applications/Apps/KKBO/KKBO.vue';
import AppNotFound from '@/views/Applications/Apps/AppNotFound.vue';

import Button from '@/components/Button/Button.vue';
import { defineComponent } from 'vue';

type AppComponent =
| typeof AppNotFound
| typeof PricePerUnit
| typeof KKBO;

interface Data {
  appName: string;
  appComponent: AppComponent | null;
}

const getAppComponent = (appName: string): AppComponent => {
  switch (appName) {
  case Applications.pricePerUnit.appKey:
    return PricePerUnit;
  case Applications.kkbo.appKey:
    return KKBO;
  default:
    return AppNotFound;
  };
};

export default defineComponent({
  components: {
    Button
  },
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
    this.appName = Applications[name].appName;
    this.appComponent = getAppComponent(name);
  },
  data(): Data {
    return {
      appComponent: null,
      appName: '',
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  }
});
</script>

<style lang="scss" scoped>
main {
  padding: 0 5rem;
}
header {
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
  align-items: center;
}
.backContainer {
  display: flex;
  justify-content: flex-start;
}

@media only screen and (max-width: 760px) {
  main {
    padding: 0 1rem;
  }

}

</style>
