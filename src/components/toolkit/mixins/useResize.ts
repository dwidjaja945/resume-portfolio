import { ComponentOptions } from 'vue';

export interface Data {
  windowWidth: number;
}

export const useResize = (cb?: any): ComponentOptions => ({
  data() {
    return {
      windowWidth: window.innerWidth,
    };
  },
  beforeMount() {
    window.onresize = this.handleResize;
  },
  beforeUnmount() {
    window.onresize = null;
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
  },
});
