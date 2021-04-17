<template>
  <div class="root">
    <div class="left">
      <p>
        This is a browser extension that allows you to
        find the best price per some unit when shopping for groceries.
      </p>
      <p>
        As of right now, it works on many online grocery sites,
        such as <b>Target, Shipt, Instacart, Sameday Costco, and SayWeee!</b>
      </p>
      <p>
        I even have some
          <a
            href="https://www.tiktok.com/@dwidjaja"
            target="_blank"
            rel="noopener noreferrer"
          >TikToks</a>
        going over how it works!
      </p>
      <blockquote
        class="tiktok-embed"
        cite="https://www.tiktok.com/@dwidjaja/video/6939312209067609349"
        data-video-id="6939312209067609349"
        style="max-width: 605px;min-width: 325px;"
      >
      <section>
        <a target="_blank" title="@dwidjaja" href="https://www.tiktok.com/@dwidjaja">@dwidjaja</a>
        <p>
          <a title="fyp" target="_blank" href="https://www.tiktok.com/tag/fyp">##fyp</a>
          <a title="foryoupage" target="_blank" href="https://www.tiktok.com/tag/foryoupage">##foryoupage</a>
          <a title="groceries" target="_blank" href="https://www.tiktok.com/tag/groceries">##groceries</a>
          <a title="softwareengineer" target="_blank" href="https://www.tiktok.com/tag/softwareengineer">##softwareengineer</a>
          <a title="software" target="_blank" href="https://www.tiktok.com/tag/software">##software</a>
          <a title="chrome" target="_blank" href="https://www.tiktok.com/tag/chrome">##chrome</a>
          <a title="hack" target="_blank" href="https://www.tiktok.com/tag/hack">##hack</a></p>
          <a target="_blank" title="♬ Steven Universe - L.Dre" href="https://www.tiktok.com/music/Steven-Universe-6795585271782967298">♬ Steven Universe - L.Dre</a>
        </section>
      </blockquote>
    </div>

    <div class="right">
      <div v-show="scriptLoaded" class="tiktokContainer">
        <blockquote
          class="tiktok-embed"
          cite="https://www.tiktok.com/@dwidjaja/video/6944445537663978757"
          data-video-id="6944445537663978757"
          style="max-width: 605px;min-width: 325px;"
        >
          <section>
            <a target="_blank" title="@dwidjaja" href="https://www.tiktok.com/@dwidjaja">@dwidjaja</a>
            <p>Bonus points if you can figure out what I’m adding next.
              <a title="fyp" target="_blank" href="https://www.tiktok.com/tag/fyp">##fyp</a>
              <a title="foryoupage" target="_blank" href="https://www.tiktok.com/tag/foryoupage">##foryoupage</a>
              <a title="groceries" target="_blank" href="https://www.tiktok.com/tag/groceries">##groceries</a>
              <a title="software" target="_blank" href="https://www.tiktok.com/tag/software">##software</a>
              <a title="softwareengineer" target="_blank" href="https://www.tiktok.com/tag/softwareengineer">##softwareengineer</a>
              <a title="chrome" target="_blank" href="https://www.tiktok.com/tag/chrome">##chrome</a>
              <a title="hack" target="_blank" href="https://www.tiktok.com/tag/hack">##hack</a> <a title="vue" target="_blank" href="https://www.tiktok.com/tag/vue">##vue</a> <a title="extensions" target="_blank" href="https://www.tiktok.com/tag/extensions">##extensions</a>
            </p>
            <a target="_blank" title="♬ Lofi - Domknowz" href="https://www.tiktok.com/music/Lofi-6799585653702019073">♬ Lofi - Domknowz</a>
            </section>
        </blockquote>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useScriptMixin, UseScriptMixinData } from '@/components/toolkit/mixins/useScript';

type Data = UseScriptMixinData;

export default defineComponent({
  name: 'pricePerUnit',
  mixins: [useScriptMixin('https://www.tiktok.com/embed.js')],
  data(): Data {
    return {
      scriptLoaded: false,
      scriptError: false,
      script: ''
    };
  },
});
</script>

<style lang="scss" scoped>
.root {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
}

.left {
  text-align: left;
}

@media only screen and (max-width: 760px) {
  .root {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    grid-gap: 1rem;
  }
}

</style>
