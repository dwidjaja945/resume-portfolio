<template>
  <div class="root" v-if="!isMe">
    <h1>Again, this is <b>NOT</b> a public facing page</h1>
    <h3>Proceed at your own risk</h3>
    <form @submit.prevent="check()" class="check">
      <input type="password" v-model="secretCode" />
      <div v-show="showLogin" id="firebaseAuth" />
      <Button type="submit" color="primary" :disabled="!secretCode.length || hasError">
        CHECK
      </Button>
      <Button class="clearButton" @click="clear()">CLEAR</Button>
      <h3 v-show="hasError" class="errorText">You probably should not be here</h3>
    </form>
  </div>
  <div class="root" v-else>
    <div class="form" v-if="!didSubmit">
      <header>
        <span />
        <!-- This is so I can use display: grid to my liking -->
        <h3>Add New Expense</h3>
        <Button class="clear" :click="clear">
          X
        </Button>
      </header>
      <div>
        <h3>So far, you've spent: ${{ dailyTotal }} today.</h3>
      </div>
      <div class="inputContainer">
        <label for="spend-type">Category</label>
        <select class="select" name="spend-type" id="spend-type" v-model="selectedSpendType">
          <option v-for="type of spendTypes" :key="type.id" :value="type.spendType">
            {{ type.spendType }}
          </option>
        </select>
      </div>
      <div class="commonCategoriesContainer">
        Common Categories
        <div class="commonCategories">
          <PillButton
            :key="type"
            v-for="type of commonCategories"
            :onclick="() => handlePillSelect(type)"
          >
            {{ type }}
          </PillButton>
        </div>
      </div>
      <div class="inputContainer">
        <label for="spend-date">Date</label>
        <input type="date" id="spend-date" v-model="spendDate" />
      </div>
      <div class="inputContainer">
        <div>
          <label for="amount">Amount ($)</label>
          <div class="checkbox-container">
            <input id="isReimbursement" type="checkbox" v-model="isReimbursement" />
            <label for="isReimbursement">Reimbursement?</label>
          </div>
        </div>
        <AmountInput :amount="amount" :isNegative="isReimbursement" @setAmount="setAmount" />
      </div>
      <div class="inputContainer">
        <label for="payee">Payee</label>
        <input id="payee" type="text" v-model="payee" />
      </div>
      <div class="inputContainer">
        <label for="what">For What</label>
        <textarea type="text" id="what" multiple v-model="forWhat" />
      </div>
      <div class="inputContainer">
        <label for="payment-type">Payment Type</label>
        <select id="payment-type" name="payment-type" class="select" v-model="paymentType">
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
        <Button
          :disabled="isSubmitting || didSubmit || !payee.length || !amount.length"
          :click="submit"
          color="primary"
        >
          SUBMIT
        </Button>
        <Button :click="reset" color="secondary">
          RESET
        </Button>
      </div>
    </div>
    <div v-show="didSubmit" class="submitNotice">
      <h2>Successfully Submitted</h2>
      <Button
        :click="
          () => {
            didSubmit = false;
            reset();
          }
        "
      >
        SUBMIT ANOTHER
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import firebase from "firebase";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import "firebase/auth";

import Button from "@/components/Button/Button.vue";
import PillButton from "@/components/PillButton/PillButton.vue";
import fetchAdapter from "@/toolkit/fetchAdapter";
import { getToday } from "@/toolkit/utils";
import { addExpense, getCurrentDayTotal } from "@/toolkit/utils/firebase";
import AmountInput from "@/components/AmountInput.vue";
import { spendTypes, defaultCommonSpendTypes } from "./spendTypes";

const db = firebase.firestore();

const initialData = {
  secretCode: "",
  showLogin: false,
  selectedSpendType: "Eating Out",
  spendDate: getToday().today,
  amount: "",
  payee: "",
  forWhat: "",
  paymentType: "CC",
  commonCategories: defaultCommonSpendTypes,
  isReimbursement: false
};

type Data = typeof initialData & {
  userName: string;
  didSubmit: boolean;
  isSubmitting: boolean;
  isMe: boolean;
  showLogin: boolean;
  uid: string;
  dailyTotal: string;
  submitted: boolean;
  hasError: boolean;
  rerouteCountdownId: number | null;
};

const defaultUiConfig: firebaseui.auth.Config = {
  signInFlow: "popup",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  tosUrl: "https://google.com",
  privacyPolicyUrl: "https://google.com"
};

export default defineComponent({
  components: {
    Button,
    PillButton,
    AmountInput
  },
  setup() {
    const uiRef = ref<firebaseui.auth.AuthUI | null>(null);

    return { uiRef, spendTypes, defaultCommonSpendTypes };
  },
  created() {
    firebase.auth().onAuthStateChanged(async firebaseUser => {
      if (firebaseUser) {
        const { uid } = firebaseUser;
        this.uid = uid;
        this.$store.dispatch("setUid", { uid });
        try {
          const user = await db.collection("users").doc(uid);
          const currentUser = await user.get();
          const data = currentUser.data();
          if (data) {
            this.setDailyTotal();
            this.isMe = data.can_view;
            // TODO - add common_categories to db
            /*
              {
                [category]: number
              }
              Then sort by most occurring category.
              Only display top 5.
              Handle in addExpenses.ts.
              Will need to create a method to parse through object returned from DB.
            */
            this.commonCategories = data.common_categories ?? defaultCommonSpendTypes;
            const name = firebaseUser.displayName;
            if (name) {
              this.userName = name;
            }
            return;
          }
        } catch (error) {
          if (this.uid.length) {
            firebase.analytics().logEvent("imposter_tried_to_login");
            firebase.analytics().setUserProperties({
              user_name: firebaseUser.displayName,
              user_email: firebaseUser.email
            });
            const mailerData: MailerPRIVATE_ImposterBody = {
              type: "imposterNotif",
              googleData: firebaseUser
            };
            this.sendMail(mailerData);
            this.reroute();
            return;
          }
        }
      }
      this.isMe = false;
      this.renderAuthUI();
    });
  },
  data(): Data {
    return {
      ...initialData,
      userName: "",
      didSubmit: false,
      isSubmitting: false,
      isMe: false,
      uid: "",
      dailyTotal: "0",
      submitted: false,
      hasError: false,
      rerouteCountdownId: null
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
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        this.uiRef = new firebaseui.auth.AuthUI(firebase.auth());
        this.uiRef.start("#firebaseAuth", {
          ...defaultUiConfig,
          callbacks: {
            signInSuccessWithAuthResult: (authResult: any): boolean => {
              const { uid } = authResult.user;
              this.uid = uid;
              db.collection("users")
                .doc(uid)
                .get()
                .then((): void => {
                  const usersRef = db.collection("users");
                  usersRef.doc(authResult.user.uid).set({
                    can_view: true
                  });
                })
                .catch((): void => {
                  console.log("You should not be here");
                });
              return false;
            }
          }
        });
      }
    },
    handlePillSelect(type: string): void {
      this.selectedSpendType = type;
    },
    setDailyTotal(): void {
      if (this.uid != null) {
        getCurrentDayTotal(this.uid).then(total => {
          this.dailyTotal = total;
        });
      }
    },
    setAmount(newAmount: string): void {
      this.amount = newAmount;
    },
    reroute() {
      firebase.auth().signOut();
      this.hasError = true;
      this.clear();
      this.rerouteCountdownId = setTimeout(() => {
        this.$router.push("/");
      }, 2000);
    },
    check(): void {
      if (
        this.secretCode === process.env.VUE_APP_PRIVATE_PASS_0 ||
        this.secretCode === process.env.VUE_APP_PRIVATE_PASS_1
      ) {
        this.showLogin = true;
        this.hasError = false;
        if (this.uiRef) return;
        this.renderAuthUI();
      } else {
        firebase.analytics().logEvent("potential_imposter");
        firebase.analytics().setUserProperties({ user_input: this.secretCode });
        const data: MailerPRIVATE_ImposterBody = {
          type: "imposterNotif",
          secretCode: this.secretCode
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
    async submit() {
      this.isSubmitting = true;
      const data: MailerPRIVATE_ExpenseBody = {
        type: "expenseReport",
        category: this.selectedSpendType,
        date: this.spendDate,
        amount: this.isReimbursement ? `-${this.amount}` : this.amount,
        payee: this.payee,
        memo: this.forWhat,
        paymentType: this.paymentType,
        submittedBy: this.userName
      };
      await Promise.all([addExpense(this.uid, data), this.sendMail(data)]);
      this.didSubmit = true;
      this.isSubmitting = false;
    },
    async sendMail(data: MailerPRIVATE_ExpenseBody | MailerPRIVATE_ImposterBody): Promise<void> {
      await fetchAdapter("/.netlify/functions/mailer", {
        body: JSON.stringify(data)
      });
    },
    reset() {
      this.setDailyTotal();
      Object.assign(this.$data, { ...initialData });
    }
  }
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

.form {
  width: 300px;
}

header {
  display: grid;
  grid-template-columns: 1fr 10fr 1fr;
}

input {
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: 1px solid #332c2c;
}
button {
  margin-top: 1rem;
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
  textarea {
    resize: vertical;
    min-height: 7.5rem;
  }
}

.commonCategoriesContainer {
  margin: 1rem;
}

.commonCategories {
  display: flex;
  flex-wrap: wrap;
}

.checkbox-container {
  display: flex;
  align-items: center;
  justify-content: center;
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
  margin-top: 1rem;
}

.clear {
  padding: 0.5rem;
  margin: 0;
}
</style>
