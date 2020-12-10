import React, { Fragment, useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, List, Paper, Button } from "@material-ui/core/";
import firebase from "../../config/firebase";
import ListPublication from "./ListPublication";
import { loadPublication } from "../../utils/dbUtils";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "10px",
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  containerElements: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  link: {
    textDecoration: "none",
  },
}));

const Publication = (props) => {
  const classes = useStyles();
  const { currentUser } = firebase.auth();
  const [view, setView] = useState({
    publications: [],
  });

  const addPublication = (publication) => {
    view.publications.push(publication);

    setView({
      ...view,
    });
  };

  const handleDelete = (e, keyID) => {
    e.preventDefault();
    deletePublication(keyID);
  };

  const deletePublication = (keyID) => {
    firebase
      .database()
      .ref()
      .child(`/publications/${keyID}`)
      .remove()
      .then(() => {
        alert("Borrardo");
        props.history.push("/");
      })
      .catch(error => {
        console.log(error);
      })
    }

  useEffect(() => {
    if (currentUser) {
      const refPublications = firebase.database().ref("/publications");

      refPublications
        .orderByChild("propietary/userID")
        .equalTo(currentUser.uid)
        .on(
          "child_added",
          (snapshot) => {
            console.log(snapshot.val());
            const newPublication = snapshot.val();
            newPublication.oldImage = newPublication.image;
            newPublication.key = snapshot.key;
            loadPublication(snapshot.key).then((response) => {
              newPublication.image = response.image;
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

  console.log(view)
  return (
    <Fragment>
      <div className={classes.container}>
        <Typography variant="h4" color="initial">
          Mis Publicaciones
        </Typography>
      </div>
      <div className={classes.containerElements}>
        <Link to="/user/addproduct" className={classes.link}>
          <Button variant="contained" color="primary">
            Nueva Publicación
          </Button>
        </Link>
      </div>
      <div className={classes.containerElements}>
        {view.publications.length > 0 && (
          <Paper elevation={3} style={{ width: "100%", marginTop: "1em" }}>
            <List className={classes.root}>
              {view.publications &&
                view.publications.map((publication, index) => (
                  <ListPublication
                    key={index}
                    name={publication.name}
                    imageURL={publication.image}
                    createAt={publication.createAt}
                    keyID={publication.key}
                    deletePublication={handleDelete}
                  />
                ))}
            </List>
          </Paper>
        )}
      </div>
    </Fragment>
  );
};

export default withRouter(Publication);
