<template>
  <div class="root" v-if="!isMe">
    <h1>Again, this is <b>NOT</b> a public facing page</h1>
    <h3>Proceed at your own risk</h3>
    <form @submit.prevent="check()" class="check">
      <input type="password" v-model="secretCode" />
      <div v-show="showLogin" id="firebaseAuth" />
      <Button
        type="submit"
        color="primary"
        :disabled="!secretCode.length || hasError"
      >
        CHECK
      </Button>
      <Button class="clearButton" @click="clear()">CLEAR</Button>
      <h3 v-show="hasError" class="errorText" >You probably should not be here</h3>
    </form>
  </div>
  <router-view v-else-if="isMe" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
});
</script>
