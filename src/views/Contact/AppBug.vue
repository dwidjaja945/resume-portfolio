<template>
  <div class="root">
    <h3>On</h3>
    <h2>{{appName}}</h2>
    <p>
      Please leave a detailed description below
      as to what went wrong and how I can reproduce
      the issue. Hopefully I'll be able to fix it soon!
    </p>
    <ContactForm
      :appName="appName"
      contactType="bugReport"
    />
  </div>
</template>

<script lang="ts">
import ContactForm from '@/components/ContactForm.vue';
import { getApplicationName } from '@/router/Applications';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { ContactForm },
  data() {
    const { appName } = this.$route.params;
    return {
      appName: getApplicationName(appName),
    };
  },
});
</script>

<style lang="scss" scoped>
h2 {
  color: var(--secondary);
}
.root {
  height: 80vh;
}
</style>
