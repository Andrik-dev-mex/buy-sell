import React from 'react';
import firebase from 'firebase/app';
import {withRouter as Router} from 'react-router-dom';
import Routes from './Routes';
import 'firebase/auth';
import 'firebase/database';
import 'fontsource-roboto';


var firebaseConfig = {
  apiKey: "AIzaSyCTa_fTqxw4CFXtk64rNZsqRgizuNMt4OI",
  authDomain: "local-commerce-6663e.firebaseapp.com",
  databaseURL: "https://local-commerce-6663e.firebaseio.com",
  projectId: "local-commerce-6663e",
  storageBucket: "local-commerce-6663e.appspot.com",
  messagingSenderId: "858423879482",
  appId: "1:858423879482:web:e5640ecea6708e18ae9203"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <div>
      <Router>
        <Routes/>
      </Router>
    </div>
  );
}

export default App;
