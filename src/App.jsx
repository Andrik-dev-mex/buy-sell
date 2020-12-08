import React, { useState, useEffect } from "react";
import firebase from "./config/firebase";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import { loadUser } from "./utils/dbUtils";
import ListDrawer from "./layout/ListDrawer";
import Appbar from "./layout/Appbar";
import ContentDrawer from "./layout/ContentDrawer";
import User from "./components/user/User";
import { ThemeProvider } from "@material-ui/core/styles";
import "fontsource-roboto";
import Theme from "./config/theme";

function App(props) {
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
        <ThemeProvider theme={Theme}>
          <Appbar
            content={
              <ContentDrawer
                content={<Routes />}
                listContent={ user && <ListDrawer name={user.name} lastname={user.lastname} image={user.avatar}/>}
                user={user}
                userOptions={user && <User user={user} onLogout={onLogout} />}
              />
            }
          />
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
