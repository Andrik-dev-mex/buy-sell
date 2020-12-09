import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {  Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  inline: {
    display: "inline",
  },
  button: {
    marginRight: "5px"
  },
  link: {
    textDecoration: "none",
    color: "white",
    
  },
}));


export default function ListPublication({ title, id, sku,  urlImage, nameProduct, description, oldImage, onDelete, price}) {
  const classes = useStyles();
  return (
    <div>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar src={urlImage} alt = {title}/>
        </ListItemAvatar>
        <ListItemText
          primary={nameProduct}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {"sku: " + sku + " | $"}{price}
              </Typography>
              { " - " + description}
              
            </React.Fragment>
          }
        />
        <ListItemSecondaryAction>
          <Button variant="contained" color="primary" className={classes.button}>
            <Link to={"/editProductos/:uid"} className={classes.link}>
            Editar
            </Link>
          </Button>
          <Button variant="contained" color="secondary" onClick={() => {onDelete(id, oldImage)}}>
            Eliminar
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="inset" component="li" />
      </div>
  );
};
