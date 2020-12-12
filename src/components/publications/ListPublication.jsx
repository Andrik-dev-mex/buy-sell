import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, withRouter } from "react-router-dom";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button : {
    marginRight: 5,
  },
  link: {
    textDecoration : "none",
    color: "white",
  }
}));

function ListPublication({ name, createAt, imageURL, deletePublication, keyID, index }) {
  const classes = useStyles();
  return (
    <Fragment>
      <ListItem>
        <ListItemAvatar>
          <Avatar src={imageURL}/>
        </ListItemAvatar>
        <ListItemText primary={name} secondary={createAt} />
        <Link to={`/user/publication/edit/${keyID}`} className={classes.link}>
        <Button variant="contained" color="primary" className={classes.button}>
          Editar
        </Button>
        </Link>
        <Button variant="contained" color="secondary" onClick={(e) => {deletePublication(e, keyID, index)}}>
          Eliminar
        </Button>
      </ListItem>
    </Fragment>
  );
}

export default withRouter(ListPublication);