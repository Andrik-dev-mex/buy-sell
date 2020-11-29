import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import firebase from "../config/firebase";

function Home(props) {
  document.title = "Inicio";
  const { currentUser } = firebase.auth();
  console.log(currentUser);
  useEffect(() => {
    if(currentUser){
      
    } else {
      props.history.push('/login');
    }
    
  }, [currentUser,props]);

  return (
    <div>
      <p>asdasd</p>
    </div>
  );
}


export default withRouter(Home);