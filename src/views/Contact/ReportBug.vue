<template>
  <main class="root">
    <Navigation>
      <h2>Report a Bug</h2>
      <router-view />
      <div>
        <p>
          I never wanted it to come to this.
        </p>
        <p>
          Please select which application has a bug.
        </p>
      </div>
      <AppGrid>
        <AppCard
          v-for="({name}, appKey) in Applications"
          :key="`report-bug-${appKey}`"
          :to="generateDynamicPath(Paths.REPORT_BUG, appKey)"
        >
          <h3>{{name}}</h3>
        </AppCard>
      </AppGrid>
    </Navigation>
  </main>
</template>

<script lang="ts">
import Navigation from '@/components/Navigation.vue';
import AppGrid from '@/components/AppDisplay/AppGrid.vue';
import AppCard from '@/components/AppDisplay/AppCard.vue';
import { Paths, generateDynamicPath } from '@/router/Paths';
import { Applications } from '@/router/Applications';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      Paths,
      Applications,
      generateDynamicPath
    };
  },
  components: { Navigation, AppGrid, AppCard },
});
</script>

<style lang="scss" scoped>
.root {
  padding: 0 1.5rem 5rem;
}

</style>
