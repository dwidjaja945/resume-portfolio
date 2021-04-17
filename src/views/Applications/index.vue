<template>
  <div class="root">
    <Navigation>
      <h2>Applications</h2>
      <p>Here are my current applictions</p>
      <AppGrid>
        <AppCard
          v-for="({name, description, isUnderConstruction}, appKey) in Applications"
          :key="`application-list-${appKey}`"
          :to="generateDynamicPath(Paths.APPLICATIONS, appKey)"
          className="appCard"
        >
          <div class="appCardBody">
            <h2>
              {{name}}
            </h2>
            <p>
              {{description}}
            </p>
            <div class="construction" v-if="isUnderConstruction">
              <span class="constructionText">
                APP UNDER CONSTRUCTION
              </span>
            </div>
          </div>
        </AppCard>
      </AppGrid>
    </Navigation>
  </div>
</template>

<script lang="ts">
import AppGrid from '@/components/AppDisplay/AppGrid.vue';
import AppCard from '@/components/AppDisplay/AppCard.vue';
import Navigation from '@/components/Navigation.vue';
import { Paths, generateDynamicPath } from '@/router/Paths';
import { Applications } from '@/router/Applications';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return { Applications, Paths, generateDynamicPath };
  },
  components: { Navigation, AppGrid, AppCard },
});
</script>

<style lang="scss" scoped>
h2 {
  margin: 0;
}
.root {
  background: var(--gradientBackground);
  min-height: 100vh;
}
.appCard {
  background-color: white;
  padding: 1rem;
  &:hover {
    .construction {
      opacity: 1;
    }
  }
}
.appCardBody {
  position: relative;
}
.construction {
  transition: opacity 0.2s ease;
  opacity: 0;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.constructionText {
  font-size: 1.25rem;
  font-weight: bold;
  transform: rotate(-20deg);
  color: red;
  border: 1px solid red;
  border-radius: 2px;
  padding: 1rem;
}
</style>
