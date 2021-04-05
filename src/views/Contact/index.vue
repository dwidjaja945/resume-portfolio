<template>
  <main>
    <Navigation>
      <h2>Contact</h2>
      <div class="root">
        <p>If you would like to reach me directly, please feel free to fill out the form below</p>
        <p>
          If you need to report a bug on one of my applications, please do so here:
          <router-link to="/contact/report-bug">Report a Bug</router-link>
        </p>
      </div>
      <ContactForm :isFullNameRequired="true" :isEmailRequired="true" />
    </Navigation>
  </main>
</template>

<script lang="ts">
import ContactForm from '@/components/ContactForm.vue';
import Navigation from '@/components/Navigation.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { Navigation, ContactForm },
  name: 'Contact',
});
</script>

<style lang="scss" scoped>
h2 {
  margin: 0;
}

main {
  background: var(--gradientBackground);
  min-height: 100vh;
}

.root {
  padding: 0 1.5rem;
}

</style>
