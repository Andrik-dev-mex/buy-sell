import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyCTa_fTqxw4CFXtk64rNZsqRgizuNMt4OI",
  authDomain: "local-commerce-6663e.firebaseapp.com",
  databaseURL: "https://local-commerce-6663e.firebaseio.com",
  projectId: "local-commerce-6663e",
  storageBucket: "local-commerce-6663e.appspot.com",
  messagingSenderId: "858423879482",
  appId: "1:858423879482:web:e5640ecea6708e18ae9203",
};

export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
