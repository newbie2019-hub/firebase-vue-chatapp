import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//Moment JS
import moment from 'moment'
Vue.filter('formatDate', function (value) {
  if (value) {
      return moment(String(value)).format('MMMM Do YYYY, h:mm a');
  }
})

import firebase from 'firebase/app';

// Add the Firebase products that you want to use
require("firebase/firestore");

//FROM FIREBASE WEBSITE CONFIG GENERATED
var firebaseConfig = {
  apiKey: "AIzaSyCA-pxazekh_hP13niMxdpEjDaEp9bWgqc",
  authDomain: "fir-vue-chatapp.firebaseapp.com",
  databaseURL: "https://fir-vue-chatapp.firebaseio.com",
  projectId: "fir-vue-chatapp",
  storageBucket: "fir-vue-chatapp.appspot.com",
  messagingSenderId: "777065203882",
  appId: "1:777065203882:web:aaf623a7309a835da928d3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// then invoke firebase
var db = firebase.firestore();

//ASSIGN TO WINDOWS VARIABLE SO THAT IT IS ACCESSIBLE TO OTHER COMPONENTS
window.db = db;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
