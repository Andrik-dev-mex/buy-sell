import React, { Fragment, useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, List, Paper, Button } from "@material-ui/core/";
import firebase from "../../config/firebase";
import ListPublication from "./ListPublication";
import { loadPublication } from "../../utils/dbUtils";
import AlertSnack from "../../AlertSnack";


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
  document.title = "Mis Publicaciones";
  const classes = useStyles();
  const { currentUser } = firebase.auth();

  const [view, setView] = useState({
    publications: [],
  });

  const [alertOptions, setAlertOptions] = useState({
    open: false,
    variant: "",
    message: "",
  });

  const handleDelete = (e, keyID, index) => {
    e.preventDefault();
    deletePublication(keyID, index);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOptions({
      ...alertOptions,
      open: false,
    });
  };

  const deletePublication = (keyID, index) => {
    //borrar imagen de firebase
    firebase.auth();
    //borrar objeto de firebase
    firebase
      .database()
      .ref()
      .child(`/publications/${keyID}`)
      .remove()
      .then(() => {
        setAlertOptions({
          ...alertOptions,
          open: true,
          message: "Publicacion eliminada con exito",
          variant: "success",
        });
        view.publications.splice(index, 1);
        setView({ ...view });
      })
      .catch(() => {
        setAlertOptions({
          ...alertOptions,
          open: true,
          message: "Publicación no eliminada",
          variant: "error",
        });
      });
  };

  useEffect(() => {
    const container = [];

    if (currentUser) {
      const refPublications = firebase.database().ref("/publications");
      refPublications
        .orderByChild("propietary/userID")
        .equalTo(currentUser.uid)
        .on(
          "child_added",
          (snapshot) => {
            const newPublication = snapshot.val();
            newPublication.oldImage = newPublication.image;
            newPublication.key = snapshot.key;
            loadPublication(snapshot.key).then((response) => {
              newPublication.image = response.image;
              container.push(newPublication);
              setView({
                ...view,
                publications: container,
              });

            })
            .catch(error => {
              

            });

          },
          (error) => {
            if (error.message.includes("permission_denied")) {
              props.history.push("/login");
            }
           
          }
        );
    }
    //eslint-disable-next-line
  }, [currentUser]);

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
                    index={index}
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
      <AlertSnack
        open={alertOptions.open}
        message={alertOptions.message}
        variant={alertOptions.variant}
        handleClose={handleClose}
      />
    </Fragment>
  );
};

export default withRouter(Publication);
