import React, { Fragment, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import firebase from "../config/firebase";
import Card from "./Card/Card";
import { loadPublication } from "../utils/dbUtils";
import { makeStyles } from "@material-ui/core/styles";

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
  const fecha = new Date();
  document.title = "Inicio";
  const classes = useStyles();
  const { currentUser } = firebase.auth();
  const [view, setView] = useState({
    publications: [],
  });

  useEffect(() => {
    if (currentUser) {
    } else {
      props.history.push("/login");
    }
    //eslint-disable-next-line
  }, [currentUser, props]);

  useEffect(() => {
    const publicationRef = firebase.database().ref("/publications");
    publicationRef.on(
      "child_added",
      (snapshot) => {
        const newPublication = snapshot.val();
        loadPublication(snapshot.key)
          .then((res) => {
            newPublication.image = res.image;
            view.publications.push(newPublication);
            setView({ ...view });
          })
          .catch((error) => {
            console.log(error);
          });
      },
      (error) => {
        console.log(error);
      }
    );
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <div className={classes.container}>
        {view.publications &&
          view.publications.map((publi, index) => (
            <Card
              name={publi.name}
              brand={publi.brand}
              description={publi.description}
              state={publi.state}
              price={publi.price}
              image={publi.image}
              category={publi.category}
              descriptionExtended={publi.descriptionExtended}
              typeOfBuy={publi.typeOfBuy}
              namePropietary={publi.propietary.name}
              imagePropietary={publi.propietary.image}
            />
          ))}
      </div>
    </Fragment>
  );
}

export default withRouter(Home);
