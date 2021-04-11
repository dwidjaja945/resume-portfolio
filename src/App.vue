<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
});
</script>

<style lang="scss">
:root {
    --primary: #034353;
    --primaryDark:#02333f;
    --primaryLight: #125f72;
    --secondary: #559c96;
    --gradientBackground: linear-gradient(-45deg, var(--secondary), white);
}

body,
h2,
h3 {
    margin: 0;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 10px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}

@media only screen and (max-width: 767px) {
  input,
  select,
  textarea {
    font-size: 16px;
  }
}
</style>
