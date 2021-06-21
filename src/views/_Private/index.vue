<template>
  <div class="root" >
    <h1>
      This is <b>NOT</b> a public facing path.
    </h1>
    <p>
      If you found this page by accident, or are snooping around,
      please return to <router-link to="/">home</router-link>.
    </p>
    <div class="links">
      <Button to="/">Go Home</Button>
      <Button
        color="error"
        :to="Paths.PRIVATE_AUTHENTICATE"
        @click="logEvent()"
      >
        Proceed
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { Paths } from '@/router/Paths';
import Button from '@/components/Button/Button.vue';
import firebase from 'firebase';
import { defineComponent } from 'vue';

const db = firebase.firestore();

export default defineComponent({
  components: { Button },
  setup() {
    return {
      Paths,
    };
  },
  created() {
    firebase.analytics().logEvent('user_on_private');
    firebase.auth().onAuthStateChanged(async firebaseUser => {
      if (firebaseUser) {
        const { uid } = firebaseUser;
        this.$store.dispatch('setUid', { uid });
        const user = await db.collection('users')
          .doc(uid);
        const currentUser = await user.get();
        const data = currentUser.data();
        if (data?.can_view) {
          this.$router.replace(Paths.PRIVATE_DASHBOARD);
        }
      }
    });
  },
  methods: {
    logEvent(): void {
      firebase.analytics().logEvent('user_proceed_to_private');
    },
  },
});
</script>

<style lang="scss" scoped>
.links {
  display: flex;
  flex-direction: column;
  width: 15rem;
  margin: auto;
  > * {
    margin-bottom: 1rem;
  }
}
</style>
