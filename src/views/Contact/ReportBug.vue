<template>
  <main class="root">
    <Navigation>
      <router-view />
      <h2>Report a Bug</h2>
      <div>
        <p>
          I never wanted it to come to this.
        </p>
        <p>
          Please select which application has a bug.
        </p>
      </div>
      <div class="appGrid">
        <router-link
          v-for="(appName, appKey) in Applications"
          :key="`report-bug-${appKey}`"
          class="appCard"
          :to="generateDynamicPath(Paths.REPORT_BUG, appKey)"
        >
          <h3>Price Per Unit</h3>
        </router-link>
      </div>
    </Navigation>
  </main>
</template>

<script lang="ts">
import Navigation from '@/components/Navigation.vue';
import { Paths, generateDynamicPath } from '@/router/Paths';
import Applications from '@/router/Applications';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { Navigation },
  computed: {
    Paths() { return Paths; },
    Applications() { return Applications; },
  },
  methods: {
    generateDynamicPath,
  },
});
</script>

<style lang="scss" scoped>
.root {
  padding-bottom: 5rem;
}
.appGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 200px;
  padding: 1rem 5rem;
}
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
}
</style>
