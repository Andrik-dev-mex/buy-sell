import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import { loadUser } from "./utils/dbUtils";
import AppbarDrawer from "./layout/AppbarDrawer";
import "firebase/auth";
import "firebase/database";
import "fontsource-roboto";

var firebaseConfig = {
  apiKey: "AIzaSyCTa_fTqxw4CFXtk64rNZsqRgizuNMt4OI",
  authDomain: "local-commerce-6663e.firebaseapp.com",
  databaseURL: "https://local-commerce-6663e.firebaseio.com",
  projectId: "local-commerce-6663e",
  storageBucket: "local-commerce-6663e.appspot.com",
  messagingSenderId: "858423879482",
  appId: "1:858423879482:web:e5640ecea6708e18ae9203",
};

firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState(null);

  const onLogout = () => {
    setUser(null);
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((response) => {
      if (response) {
        //leer los datos del usuario
        loadUser(response.uid)
          .then((data) => {
            setUser(data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }, []);

  return (
    <div>
      <Router>
        {user && (
          <AppbarDrawer id={user.uid} onLogout={onLogout} user={user}>
            <Routes />
          </AppbarDrawer>
        )}
      </Router>
    </div>
  );
}

export default App;
