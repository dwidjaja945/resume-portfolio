import { ComponentOptions } from 'vue';

export interface Data {
  windowWidth: number;
}

export const WINDOW_SIZE = {
  xsmall: 500,
  small: 576,
  medium: 768,
  large: 992
};

type CallBack = (width?: number) => void;

export const useResize = (cb?: CallBack): ComponentOptions => ({
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
      if (cb) cb(window.innerWidth);
    },
  },
});
