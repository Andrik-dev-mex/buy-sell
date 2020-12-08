import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import firebase from "../config/firebase";
import Target from "./Target/Target";
import publications from "./user/Publications";

function Home(props) {
  document.title = "Inicio";
  const { currentUser } = firebase.auth();
  const [publications, setPublications] = useState([]);

  const addPublication = (publication) => {
    publications.push(publication);
    setPublications({
      ...publication,
      publications,
    });
  }
  console.log(currentUser);
  useEffect(() => {
    if(currentUser){
      const publicationRef = firebase.database().ref("/publications");
      publicationRef.on("child_added", (snapshot) => {
        console.log(snapshot.val());
      }, (error) => {
        console.log(error);
      })
    } else {
      props.history.push('/login');
    }
    
  }, [currentUser,props]);

  return (
    <div>
      <Target />
    </div>
  );
}


export default withRouter(Home);