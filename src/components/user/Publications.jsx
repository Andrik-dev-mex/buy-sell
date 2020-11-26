import React, { Fragment, useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, List, ListItem, ListItemAvatar } from "@material-ui/core/";
import firebase from "../../config/firebase";
import { Avatar, ListItemText, Button } from "@material-ui/core";

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
    textDecoration: "none"
  }
}));

const Publication = (props) => {
  const classes = useStyles();
  const { currentUser } = firebase.auth();
  const [publications, setPublications] = useState([]);

  const addPublication = (publication) => {
    publications.push(publication);

    setPublications({
      ...publications,
      publications,
    });
  };

  useEffect(() => {
    if (currentUser) {
    } else {
      props.history.push("/login");
    }
  }, [currentUser, props]);

  return (
    <Fragment>
      <div className={classes.container}>
        <Typography variant="h4" color="initial">
          Mis Publicaciones
        </Typography>
      </div>
      <div className={classes.containerElements}>
        <Link to ="/user/addproduct"className={classes.link}>
          <Button variant="contained" color="primary">
            Nueva Publicación
          </Button>
        </Link>
      </div>
      <div className={classes.containerElements}>
        <List className={classes.root}>
          <ListItem
            button
            onClick={() => {
              alert("me has tocado, cochino =/");
            }}
          >
            <ListItemAvatar>
              <Avatar></Avatar>
            </ListItemAvatar>
            <ListItemText primary="Photos" secondary="Jan 9, 2014" />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar></Avatar>
            </ListItemAvatar>
            <ListItemText primary="Work" secondary="Jan 7, 2014" />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar></Avatar>
            </ListItemAvatar>
            <ListItemText primary="Vacation" secondary="July 20, 2014" />
          </ListItem>
        </List>
      </div>
    </Fragment>
  );
};

export default withRouter(Publication);
