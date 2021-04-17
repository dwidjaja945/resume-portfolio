<template>
  <button
    type="button"
    :class="[className, variant]"
    @click="click()"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

type Variants =
| 'primary'
| 'secondary'
| 'error';

export default defineComponent({
  name: 'buttonBase',
  props: {
    click: {
      type: Function,
    },
    className: {
      type: String,
      isRequired: false,
    },
    variant: {
      type: String,
      isRequired: false,
      validator(value: Variants): boolean {
        return new Set(['primary', 'secondary', 'error'])
          .has(value);
      }
    }
  }
});
</script>

<style lang="scss" scoped>
$background: #d4d3d3;
$backgroundDark: darken($background, 5%);
$backgroundLight: lighten($background, 5%);

@mixin applySelectors($color, $dark, $light) {
  background: $color;
  color: white;
  &:hover {
    background: $dark;
  }
  &:active {
    background: $light;
  }
}

button {
  background: $background;
  border-radius: 6px;
  text-transform: uppercase;
  padding: 0.5rem;
  border: none;
  cursor: pointer;
  outline: none;
  transition: background 0.025s linear;
  &.primary {
    $background: var(--primary);
    $backgroundDark: var(--primaryDark);
    $backgroundLight: var(--primaryLight);
    @include applySelectors($background, $backgroundDark, $backgroundLight);
  }
  &.secondary {
    $background: var(--secondary);
    $backgroundDark: var(--secondaryDark);
    $backgroundLight: var(--secondaryLight);
    @include applySelectors($background, $backgroundDark, $backgroundLight);
  }
  &.error {
    $background: #dd2f2f;
    $backgroundDark: #af1c1c;
    $backgroundLight: #f55454;
    @include applySelectors($background, $backgroundDark, $backgroundLight);
  }
  &:disabled {
    cursor: not-allowed;
  }
  &:hover {
    background: $backgroundDark;
  }
  &:active {
    background: $backgroundLight;
  }
}
</style>
