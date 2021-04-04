<template>
  <main>
    <Navigation>
      <h2>Contact</h2>
      <div>
        <p>If you would like to reach me directly, please feel free to fill out the form below</p>
        <!-- <p>
          If you need to report a bug on one of my applications, please do so here:
          <router-link to="/contact/report-bug">Report a Bug</router-link>
        </p> -->
      </div>
      <div class="form">
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
        <button type="button" @click="sendMessage">SEND</button>
        <h3 v-show="isSuccessfulSend">
          Message sent! Redirecting back to Home in {{rerouteCountdown}}...
        </h3>
        <h3 v-show="Boolean(errorMessage)">
          {{errorMessage}}
        </h3>
      </div>
    </Navigation>
  </main>
</template>

<script lang="ts">
import Navigation from '@/components/Navigation.vue';
import fetchAdapter from '@/components/toolkit/fetchAdapter';
import { Paths } from '@/router/Paths';
import { defineComponent } from 'vue';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

interface Data {
  fullName: string;
  email: string;
  message: string;
  nameHasError: boolean;
  emailHasError: boolean;
  messageHasError: boolean;
  sendAttempted: boolean;
  isSuccessfulSend: boolean;
  errorMessage: string;
  rerouteID?: number;
  rerouteInterval?: number;
  rerouteCountdown: number;
}

export default defineComponent({
  components: { Navigation },
  name: 'Contact',
  data(): Data {
    return {
      fullName: '',
      email: '',
      message: '',
      nameHasError: false,
      emailHasError: false,
      messageHasError: false,
      sendAttempted: false,
      isSuccessfulSend: false,
      errorMessage: '',
      rerouteID: undefined,
      rerouteInterval: undefined,
      rerouteCountdown: 3,
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
      const isFullNameValid = this.fullName.length >= 2;
      const isEmailValid = emailRegex.test(this.email);
      const isMessageValid = this.message.length >= 5;
      this.nameHasError = !isFullNameValid;
      this.emailHasError = !isEmailValid;
      this.messageHasError = this.message.length === 0;
      return (isFullNameValid && isEmailValid && isMessageValid);
    },
    sendMessage() {
      this.isSuccessfulSend = false;
      this.errorMessage = '';
      if (this.checkForValidMessage()) {
        const data = {
          type: 'contact',
          name: this.fullName,
          email: this.email,
          message: this.message,
        };
        fetchAdapter('/.netlify/functions/mailer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then((): void => {
            this.fullName = '';
            this.email = '';
            this.message = '';
            this.isSuccessfulSend = true;
            this.rerouteID = setTimeout(() => {
              this.$router.push(Paths.HOME);
            }, 3000);
            this.rerouteInterval = setInterval(() => {
              this.rerouteCountdown -= 1;
            }, 1000);
          })
          .catch((): void => {
            this.errorMessage = 'Sorry, we were unable to send your message. Please try again.';
          });
        }
      this.sendAttempted = true;
    },
  },
});
</script>

<style lang="scss" scoped>
h2 {
  margin: 0;
}

main {
  background: var(--gradientBackground);
  min-height: 100vh;
}

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
    margin: auto;
    width: 100%;
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
    &:hover {
      background-color: var(--primaryDark);
    }
    &:active {
      background-color: var(--primaryLight);
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
}

@media screen and (max-width: 760px) {
  .inputContainer {
    width: 90vw;
  }
}
</style>
