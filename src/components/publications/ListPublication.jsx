import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
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
  }
}));

export default function ListPublication({ name, createAt, imageURL, deletePublication, keyID }) {
  const classes = useStyles();
  return (
    <Fragment>
      <ListItem>
        <ListItemAvatar>
          <Avatar src={imageURL}/>
        </ListItemAvatar>
        <ListItemText primary={name} secondary={createAt} />
        <Button variant="contained" color="primary" className={classes.button}>
          Editar
        </Button>
        <Button variant="contained" color="secondary" onClick={(e) => {deletePublication(e, key)}}>
          Eliminar
        </Button>
      </ListItem>
    </Fragment>
  );
}
