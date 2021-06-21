import { ComponentCustomProperties } from 'vue';
import { Store } from 'vuex';
import { RootStore } from '@/store';

declare module '@vue/runtime-core' {
  // declare your own store states
  type State = RootStore;

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
