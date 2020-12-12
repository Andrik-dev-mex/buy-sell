import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import firebase from "../../config/firebase";
import { loadPublication } from "../../utils/dbUtils";
import { Grid, Button, Paper } from "@material-ui/core";

const ViewPublication = (props) => {
  const { id } = props.match.params;
  const db = firebase.database();
  const refPublication = db.ref(`/publications/${id}`);

  const [publication, setPublication] = useState({});

  useEffect(() => {
    refPublication.on(
      "value",
      (snapshot) => {
        const newPublication = snapshot.val();
        newPublication.key = snapshot.key;
        loadPublication(snapshot.key)
          .then((data) => {
            newPublication.image = data.image;
            setPublication(newPublication);
          })
          .catch((error) => {});
      },
      (error) => {
        console.log(error);
        if (error.message.includes("permission_denied")) {
          props.history.push("/login");
        }
      }
    );
    //eslint-disable-next-line
  }, []);
  console.log(publication);
  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper elevation={3}>
          <Grid container>
            <Grid item xs={6}>
              <Button variant="contained" color="primary" fullWidth>
                Aasd
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default withRouter(ViewPublication);
