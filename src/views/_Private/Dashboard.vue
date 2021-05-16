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
    firebase.auth().onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const { uid } = firebaseUser;
        this.$store.dispatch('setUid', { uid });
        const { year, month, day } = getToday();
      }
    });
  },
});
</script>
