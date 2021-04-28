<template>
  <h1>Dashboard</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import firebase from 'firebase';

import { getToday } from '@/toolkit/utils';
import { useStore } from 'vuex';
import { RootStore } from '@/store';

const db = firebase.firestore();

export default defineComponent({
  created() {
    firebase.auth().onAuthStateChanged(async firebaseUser => {
      if (firebaseUser) {
        const { uid } = firebaseUser;
        this.$store.dispatch('setUid', { uid });
        const { year, month } = getToday();

        const user = await db.collection('users')
          .doc(uid);
        const test = user.onSnapshot(snap => {
          console.log(snap);
          debugger;
        });
        debugger;
        console.log(batch);
      };
    });
  }
});
</script>
