import {
  ComponentOptions,
} from 'vue';

export interface UseScriptMixinData {
  scriptLoaded: boolean;
  scriptError: boolean;
  script: string | null;
}

export const useScriptMixin = (src: string): ComponentOptions => ({
  beforeMount() {
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    script.async = true;

    this.script = script;

    window.document.body.appendChild(script);

    const handleLoad = (): void => {
      this.scriptLoaded = true;
    };
    const handleError = (): void => {
      this.scriptError = true;
    };

    script.addEventListener('load', handleLoad);
    script.addEventListener('error', handleError);
  },
  beforeUnmount() {
    if (this.script) {
      window.document.body.removeChild(this.script);
    }
  },
  data(): UseScriptMixinData {
    return {
      scriptLoaded: false,
      scriptError: false,
      script: null,
    };
  },
});
