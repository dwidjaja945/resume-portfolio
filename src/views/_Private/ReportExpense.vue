<template>
  <div class="root" v-if="!isMe">
    <form @submit.prevent="check()" class="check">
      <input type="password" v-model="secretCode" />
      <div v-show="showLogin" id="firebaseAuth" />
      <button type="submit" :disabled="!secretCode.length || hasError" >CHECK</button>
      <button type="button" class="clearButton" @click="clear()">CLEAR</button>
      <h3 v-show="hasError" class="errorText" >You probably should not be here</h3>
    </form>
  </div>
  <div class="root" v-else >
    <div v-if="!didSubmit">
      <h3>How much did you spend today?</h3>
      <div class="inputContainer">
        <label for="spend-type">Category</label>
        <select
          class="select"
          name="spend-type"
          id="spend-type"
          v-model="selectedSpendType"
        >
          <option
            v-for="type of spendTypes"
            :key="type"
            :value="type"
          >
            {{type}}
          </option>
        </select>
      </div>
      <div class="inputContainer">
        <label for="spend-date">Date</label>
        <input
          type="date"
          id="spend-date"
          v-model="spendDate"
        />
      </div>
      <div class="inputContainer">
        <label for="amount">Amount ($)</label>
        <input
          class="amountInput"
          type="number"
          id="amount"
          step="0.01"
          v-model="amount"
        />
      </div>
      <div class="inputContainer">
        <label for="payee">Payee</label>
        <input id="payee" type="text" v-model="payee" />
      </div>
      <div class="inputContainer">
        <label for="what">For What</label>
        <textarea
          type="text"
          id="what"
          multiple
          v-model="forWhat"
        />
      </div>
      <div class="inputContainer">
        <label for="payment-type">Payment Type</label>
        <select
          id="payment-type"
          name="payment-type"
          class="select"
          v-model="paymentType"
        >
          <option value="CC">
            CC
          </option>
          <option value="DEBIT">
            DEBIT
          </option>
          <option value="CASH">
            CASH
          </option>
          <option value="CHK">
            CHK
          </option>
        </select>
      </div>

      <div class="buttonContainer">
        <button
          type="button"
          :disabled="didSubmit || !payee.length || !amount.length"
          @click="submit()"
        >
          SUBMIT
        </button>
        <button
          type="button"
          @click="reset()"
        >
          RESET
        </button>
      </div>
    </div>
    <div
      v-show="didSubmit"
      class="submitNotice"
    >
      <h2>Successfully Submitted</h2>
      <button
        type="button"
        @click="didSubmit = false"
      >
        SUBMIT ANOTHER
      </button>
    </div>
    <button
      type="button"
      class="clear"
      @click="clear()"
    >
      X
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import 'firebase/auth';

import fetchAdapter from '@/components/toolkit/fetchAdapter';
import { spendTypes } from './spendTypes';

const db = firebase.firestore();

// YYYY-MM-DD
const getToday = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  let month: string | number = today.getMonth() + 1; // Months are 0-indexed
  if (month < 10) {
    month = `0${month}`;
  }
  const day = today.getDate();
  return `${year}-${month}-${day}`;
};

const initialData = {
  secretCode: '',
  showLogin: false,
  selectedSpendType: 'Groceries/Necessities',
  spendDate: getToday(),
  amount: '',
  payee: '',
  forWhat: '',
  paymentType: 'CC',
};

type Data =
  typeof initialData &
  {
    didSubmit: boolean;
    isMe: false;
    showLogin: boolean;
    uid: string;
    submitted: boolean;
    hasError: boolean;
    rerouteCountdownId: number | null;
  };

const defaultUiConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  tosUrl: 'https://google.com',
  privacyPolicyUrl: 'https://google.com',
};

export default defineComponent({
  setup() {
    const uiRef = ref<firebaseui.auth.AuthUI | null>(null);

    return { uiRef, spendTypes };
  },
  created() {
    firebase.auth().onAuthStateChanged(async firebaseUser => {
      if (firebaseUser) {
        const { uid } = firebaseUser;
        const user = await db.collection('users')
          .doc(uid);
        const currentUser = await user.get();
        const data = currentUser.data();
        if (data) {
          this.isMe = data.can_view;
        } else if (this.uid.length) {
          const mailerData: MailerPRIVATE_ImposterBody = {
            type: 'imposterNotif',
            googleData: firebaseUser,
          };
          this.sendMail(mailerData);
          this.reroute();
        }
        return;
      }
      this.isMe = false;
      this.renderAuthUI();
    });
  },
  data(): Data {
    return {
      ...initialData,
      didSubmit: false,
      isMe: false,
      uid: '',
      submitted: false,
      hasError: false,
      rerouteCountdownId: null,
    };
  },
  async beforeUnmount() {
    if (this.rerouteCountdownId !== null) {
      clearTimeout(this.rerouteCountdownId);
    }
    // eslint-disable-next-line no-unused-expressions
    await this.uiRef?.delete();
    this.uiRef = null;
  },
  methods: {
    async renderAuthUI(): Promise<void> {
      if (this.uiRef) {
        await this.uiRef.delete();
        this.uiRef = null;
      }
      if (!this.uiRef) {
        await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        this.uiRef = new firebaseui.auth.AuthUI(firebase.auth());
        this.uiRef.start(
          '#firebaseAuth',
          {
            ...defaultUiConfig,
            callbacks: {
              signInSuccessWithAuthResult: (authResult: any): boolean => {
                this.uid = authResult.user.uid;
                return false;
                // db.collection('users').doc(authResult.user.uid).set({
                //   can_view: true,
                // });
                // return false;
              },
            },
          },
        );
      };
    },
    reroute() {
      firebase.auth().signOut();
      this.hasError = true;
      this.clear();
      this.rerouteCountdownId = setTimeout(() => {
        this.$router.push('/');
      }, 2000);
    },
    check(): void {
      if (
        this.secretCode === process.env.VUE_APP_PRIVATE_PASS_0
        || this.secretCode === process.env.VUE_APP_PRIVATE_PASS_1
      ) {
        this.showLogin = true;
        this.hasError = false;
        if (this.uiRef) return;
        this.renderAuthUI();
      } else {
        const data: MailerPRIVATE_ImposterBody = {
          type: 'imposterNotif',
          secretCode: this.secretCode,
        };
        this.sendMail(data);
        this.reroute();
      }
    },
    async clear() {
      firebase.auth().signOut();
      // eslint-disable-next-line no-unused-expressions
      await this.uiRef?.delete();
      this.uiRef = null;
      this.reset();
    },
    submit() {
      this.didSubmit = true;
      const data: MailerPRIVATE_ExpenseBody = {
        type: 'expenseReport',
        category: this.selectedSpendType,
        date: this.spendDate,
        amount: this.amount,
        payee: this.payee,
        memo: this.forWhat,
        paymentType: this.paymentType,
      };
      fetchAdapter('/.netlify/functions/mailer', {
        body: JSON.stringify(data),
      });
    },
    sendMail(data: MailerPRIVATE_ExpenseBody | MailerPRIVATE_ImposterBody): void {
      fetchAdapter('/.netlify/functions/mailer', {
        body: JSON.stringify(data),
      });
    },
    reset() {
      Object.assign(this.$data, { ...initialData });
    },
  },
});
</script>

<style lang="scss" scoped>
.root {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 5rem;
  position: relative;
}
input {
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: 1px solid #332c2c;
}
button {
  margin-top: 1rem;
  background: var(--primary);
  color: white;
  padding: 1rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.errorText {
  color: #d12626;
}

.check {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 20rem;
}

.inputContainer {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  width: 300px;
  textarea {
    resize: vertical;
    min-height: 7.5rem;
  }
}

.select {
  padding: 0.5rem;
  border-radius: 4px;
}

.buttonContainer {
  display: flex;
  flex-direction: column;
}

.submitNotice {
  display: flex;
  flex-direction: column;
}

.clearButton {
  background-color: var(--secondary);
}

.clear {
  position: absolute;
  top: 0;
  right: 1rem;
  padding: 0.5rem;
  background-color: var(--secondary);
}

</style>
