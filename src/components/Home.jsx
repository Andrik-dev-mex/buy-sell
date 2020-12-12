import React, { Fragment, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import firebase from "../config/firebase";
import { loadPublication } from "../utils/dbUtils";
import { makeStyles } from "@material-ui/core/styles";
import CardPublication from "./Card/CardPublication";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(2),
    },
  },
}));

function Home(props) {
  document.title = "Inicio";
  const classes = useStyles();
  const [view, setView] = useState({
    publications: [],
  });

  useEffect(() => {
    const container = [];
    const publicationRef = firebase.database().ref("/publications");
    publicationRef.on(
      "child_added",
      (snapshot) => {
        const newPublication = snapshot.val();
        loadPublication(snapshot.key)
          .then((res) => {
            newPublication.key = snapshot.key;
            newPublication.image = res.image;
            container.push(newPublication);
            setView({
              ...view,
              publications: container
            });
          })
          .catch((error) => {
            console.log(error);
          });
      },
      (error) => {
        console.log(error);
        if(error.message.includes("permission_denied")){
          props.history.push("/login");
        }
      }
    );
    //eslint-disable-next-line
  }, []);

  console.log(view.publications);
  return (
    <Fragment>
      <div className={classes.container}>
        {view.publications &&
          view.publications.map((publi, index) => (
            <CardPublication
              name={publi.name}
              key={index}
              brand={publi.brand}
              description={publi.description}
              state={publi.state}
              price={publi.price}
              image={publi.image}
              category={publi.category}
              descriptionExtended={publi.descriptionExtended}
              typeOfBuy={publi.typeOfBuy}
              keyID = {publi.key}
              namePropietary={publi.propietary.name}
              imagePropietary={publi.propietary.image}
            />
          ))}
      </div>
    </Fragment>
  );
}

export default withRouter(Home);
