import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDrgztYOc4qbnQH1EVjDxAVj_TLpPqUiHU",
    authDomain: "nyous-senai.firebaseapp.com",
    projectId: "nyous-senai",
    storageBucket: "nyous-senai.appspot.com",
    messagingSenderId: "1090206485030",
    appId: "1:1090206485030:web:e2ae180a030e25c72974e7"
  };

  const app = firebase.initializeApp(firebaseConfig);

  export const db = app.firestore();

  export default firebaseConfig;