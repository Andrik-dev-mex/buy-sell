import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import firebase from "../config/firebase";
import Target from "./Target/Target";
import { loadPublication } from "../utils/dbUtils";

function Home(props) {
  document.title = "Inicio";
  const { currentUser } = firebase.auth();
  const [publications, setPublications] = useState([]);

  const addPublication = (publication) => {
    publications.push(publication);
    setPublications({
      ...publications,
      publications,
    });
  };
  console.log(currentUser);
  useEffect(() => {
    if (currentUser) {
      const publicationRef = firebase.database().ref("/publications");
      publicationRef.on(
        "child_added",
        (snapshot) => {
          const newPublication = snapshot.val();
          loadPublication(snapshot.key).then((resolve) => {
            console.log(resolve);
            newPublication.image = resolve.image;
            addPublication(newPublication);
          });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      props.history.push("/login");
    }
    //eslint-disable-next-line
  }, [currentUser, props]);

  return (
    <div>
      <Target />
    </div>
  );
}

export default withRouter(Home);
