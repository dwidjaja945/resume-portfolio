<template>
  <div class="appGridRoot">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.appGridRoot {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
  grid-auto-rows: 200px;
  transition: grid-template-columns 0.2s ease;
  padding: 1rem 5rem;
}

@media screen and (max-width: 760px) {
  .appGridRoot {
    grid-template-columns: 1fr;
  }
}
</style>
