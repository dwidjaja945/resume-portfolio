<template>
  <component
    :is="renderedComponent"
    :type="type"
    :class="['buttonRoot', color, className]"
    :disabled="disabled"
    :to="to"
    :href="href || ''"
    target="_blank"
    @click="click()"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

type Colors =
| 'primary'
| 'secondary'
| 'error';

export default defineComponent({
  name: 'ButtonBase',
  props: {
    click: {
      type: Function,
    },
    className: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    type: {
      type: String,
      required: false,
      default: 'button'
    },
    to: {
      type: String,
      required: false,
    },
    href: {
      type: String,
      required: false,
    },
    component: {
      type: String,
      required: false,
      default: 'button',
    },
    color: {
      type: String,
      required: false,
      validator(value: Colors): boolean {
        return new Set(['primary', 'secondary', 'error'])
          .has(value);
      }
    }
  },
  data() {
    let renderedComponent = this.component;
    if (this.to) {
      renderedComponent = 'router-link';
    } else if (this.href) {
      renderedComponent = 'a';
    };
    return {
      renderedComponent,
    };
  },
});
</script>

<style lang="scss" scoped>
$background: #d4d3d3;
$backgroundDark: darken($background, 5%);
$backgroundLight: lighten($background, 5%);

@mixin applySelectors($color, $dark, $light) {
  color: white;
  &:hover {
    background: $dark;
  }
  &:active {
    background: $light;
  }
  &,
  &:disabled {
    background: $color;
  }
}
a {
  text-decoration: none;
  &,
  &:visited {
    color: unset;
  }
}
.buttonRoot,
a {
  background: $background;
  border-radius: 6px;
  text-transform: uppercase;
  padding: 0.5rem;
  border: none;
  cursor: pointer;
  outline: none;
  transition: background 0.025s linear;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  &:hover {
    background: $backgroundDark;
  }
  &:active {
    background: $backgroundLight;
  }
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
}
</style>
