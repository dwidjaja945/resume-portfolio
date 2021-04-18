import { createApp } from 'vue';
import firebase from 'firebase';
import 'firebase/firestore';

import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);
// https://firebase.google.com/docs/analytics/events
firebase.analytics();

createApp(App).use(store).use(router).mount('#app');
