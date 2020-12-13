import React, { useState, useEffect, Fragment } from "react";
import { withRouter } from "react-router-dom";
import firebase from "../../config/firebase";
import { loadPublication } from "../../utils/dbUtils";
import { Grid, Button, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AlertSnack from "../../AlertSnack";
import Loading from "../Card/Loading";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: 15,
  },
  image: {
    width: "100%",
    height: 400,
    border: 2,
    borderRadius: 10,
    borderStyle: "solid",
    borderColor: "#000"
  }
}));

const ViewPublication = (props) => {
  document.title = "Ver Datos";
  const { id } = props.match.params;
  const classes =useStyles();
  const db = firebase.database();
  const refPublication = db.ref(`/publications/${id}`);

  const [publication, setPublication] = useState({});

  const [loading, setLoading ] = useState(false); 

  useEffect(() => {
    setLoading(true)
    refPublication.on(
      "value",
      (snapshot) => {
        const newPublication = snapshot.val();
        newPublication.key = snapshot.key;
        loadPublication(snapshot.key)
          .then((data) => {
            newPublication.image = data.image;
            setPublication(newPublication);
            setLoading(false)
          })
          .catch((error) => {
            
          });
      },
      (error) => {
        console.log(error);
        if (error.message.includes("permission_denied")) {
          props.history.push("/login");
        }
      }
    );

    return function cleanup() {
      setPublication({});
    }
    //eslint-disable-next-line
  }, []);
  console.log(publication);
  return (
    <Fragment>
      <Loading open ={loading}/>
    <Grid container>
      <Grid item xs={12}>
        <Paper elevation={3} className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <img src={publication.image} alt="product" className={classes.image}/>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
    </Fragment>
  );
};

export default withRouter(ViewPublication);
