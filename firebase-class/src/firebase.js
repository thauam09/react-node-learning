import * as firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBLMnPM4-HLF4xbd4HNpezCSNidCYuQ47w",
    authDomain: "reactapp-2b51f.firebaseapp.com",
    databaseURL: "https://reactapp-2b51f.firebaseio.com",
    projectId: "reactapp-2b51f",
    storageBucket: "reactapp-2b51f.appspot.com",
    messagingSenderId: "670135739120",
    appId: "1:670135739120:web:11101a8341c8b19a66d835",
    measurementId: "G-57887NYCF9"
  };

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();