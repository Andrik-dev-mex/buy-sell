import React, { useState, useEffect } from "react";
import firebase from "./config/firebase";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import { loadUser } from "./utils/dbUtils";
import ListDrawer from "./layout/ListDrawer";
import Appbar from "./layout/Appbar";
import ContentDrawer from "./layout/ContentDrawer";

function App() {
  const [user, setUser] = useState(null);

  if (user) {
    var id = firebase.auth().currentUser.uid;
  }

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
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }, []);
  console.log(user, id);
  return (
    <div>
      <Router>
        <Appbar
          content={
            <ContentDrawer
              content={<Routes />}
              listContent={<ListDrawer id={id} />}
              onLogout={onLogout}
              user={user}
            />
          }
        />
      </Router>
    </div>
  );
}

export default App;
