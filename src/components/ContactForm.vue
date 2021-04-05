<template>
  <div role="form" class="form">
    <div class="inputContainer">
      <input
        type="text"
        :class="{error: nameHasError}"
        placeholder="Full Name"
        v-model="fullName"
      />
      <p class="errorText" v-show="nameHasError">Please enter your full name</p>
    </div>
    <div class="inputContainer">
      <input
        type="text"
        :class="{error: emailHasError}"
        placeholder="Email"
        v-model="email"
      />
      <p class="errorText" v-show="emailHasError">Please enter a valid email</p>
    </div>
    <div class="inputContainer">
      <textarea
        type="text"
        :class="{error: messageHasError}"
        placeholder="Message"
        v-model="message"
      />
      <p class="errorText" v-show="messageHasError">Please enter a message</p>
    </div>
    <button type="button" :disabled="isMessageSending" @click="sendMessage">
      {{isMessageSending ? 'SENDING...' : 'SEND'}}
    </button>
    <h3 v-show="isSuccessfulSend">
      Message sent! Redirecting back to Home in {{rerouteCountdown}}...
    </h3>
    <h3 v-show="Boolean(errorMessage)">
      {{errorMessage}}
    </h3>
  </div>
</template>

<script lang="ts">
import { Paths } from '@/router/Paths';
import fetchAdapter from '@/components/toolkit/fetchAdapter';
import { defineComponent } from 'vue';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

interface Data {
  fullName: string;
  email: string;
  message: string;
  nameHasError: boolean;
  emailHasError: boolean;
  messageHasError: boolean;
  isMessageSending: boolean;
  sendAttempted: boolean;
  isSuccessfulSend: boolean;
  errorMessage: string;
  rerouteID?: number;
  rerouteInterval?: number;
  rerouteCountdown: number;
}

const COUNTDOWN = 3;

export default defineComponent({
  name: 'ContactForm',
  props: {
    isFullNameRequired: {
      type: Boolean,
      isRequired: true,
    },
    isEmailRequired: {
      type: Boolean,
      isRequired: false,
      default: true,
    },
    contactType: {
      type: String,
      isRequired: false,
      default: 'contact',
    },
    appName: {
      type: String,
      isRequired: false,
    },
  },
  data(): Data {
    return {
      fullName: '',
      email: '',
      message: '',
      nameHasError: false,
      emailHasError: false,
      messageHasError: false,
      isMessageSending: false,
      sendAttempted: false,
      isSuccessfulSend: false,
      errorMessage: '',
      rerouteID: undefined,
      rerouteInterval: undefined,
      rerouteCountdown: COUNTDOWN,
    };
  },
  beforeUnmount() {
    if (this.rerouteID !== undefined) {
      clearTimeout(this.rerouteID);
    };
    if (this.rerouteInterval !== undefined) {
      clearInterval(this.rerouteInterval);
    }
  },
  methods: {
    checkForValidMessage() {
      const isFullNameValid = this.fullName.length >= 2 || !this.isFullNameRequired;
      const isEmailValid = emailRegex.test(this.email) || !this.isEmailRequired;
      const isMessageValid = this.message.length >= 5;
      this.nameHasError = !isFullNameValid;
      this.emailHasError = !isEmailValid;
      this.messageHasError = this.message.length === 0;
      return (isFullNameValid && isEmailValid && isMessageValid);
    },
    sendMessage() {
      if (this.isMessageSending) return;
      this.isSuccessfulSend = false;
      this.errorMessage = '';
      this.isMessageSending = true;
      if (this.checkForValidMessage()) {
        const data = {
          type: this.contactType,
          name: this.fullName,
          email: this.email,
          message: this.message,
          appName: this.appName,
        };
        fetchAdapter('/.netlify/functions/mailer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then((): void => {
            this.isMessageSending = false;
            this.fullName = '';
            this.email = '';
            this.message = '';
            this.isSuccessfulSend = true;
            this.rerouteID = setTimeout(() => {
              this.$router.push(Paths.HOME);
            }, COUNTDOWN * 1000);
            this.rerouteInterval = setInterval(() => {
              this.rerouteCountdown -= 1;
            }, 1000);
          })
          .catch((): void => {
            this.errorMessage = 'Sorry, we were unable to send your message. Please try again.';
          });
      } else {
        this.isMessageSending = false;
      }
      this.sendAttempted = true;
    },
  },
});
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin: 0;
  }

  input,
  textarea {
    flex: 1;
    border-radius: 6px;
    padding: 1rem;
    border: 1px solid black;
  }

  textarea {
    min-height: 10rem;
    &:active,
    &:focus {
      outline: none;
    }
  }

  button {
    width: 10rem;
    padding: 1rem;
    border-radius: 6px;
    background-color: var(--primary);
    color: white;
    font-weight: bold;
    transition: background-color 0.2s ease;
    cursor: pointer;
    &:hover:not(:disabled) {
      background-color: var(--primaryDark);
    }
    &:active {
      background-color: var(--primaryLight);
    }
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .error {
    border: 1px solid red;
  }
  .errorText {
    color: red;
  }
}

.inputContainer {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 50%;
  transition: width 0.2s ease;
}

@media screen and (max-width: 760px) {
  .inputContainer {
    width: 90vw;
  }
}
</style>