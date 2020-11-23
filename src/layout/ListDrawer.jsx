import React, { Fragment } from "react";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import NewReleasesRoundedIcon from "@material-ui/icons/NewReleasesRounded";
import ListItemText from "@material-ui/core/ListItemText";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import { Link } from "react-router-dom";
import { Tooltip, ListItem, ListItemIcon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import PublicIcon from '@material-ui/icons/Public';
import ChatIcon from '@material-ui/icons/Chat';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: "black",
    "&:hover": {
      textDecoration: "none",
      color: "black",
    },
  },
}));

const ListDrawer = ({ id }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <Link to={`/user/edit/${id}`} className={classes.link}>
        <Tooltip title="Ir a Mi Perfil">
          <ListItem button>
            <ListItemIcon>
            <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Mi Perfil" />
          </ListItem>
        </Tooltip>
      </Link>
      <Link to={`/user/notifications/${id}`} className={classes.link}>
        <ListItem button>
          <ListItemIcon>
            <NotificationsActiveIcon/>
          </ListItemIcon>
          <ListItemText primary="Notificaciones" />
        </ListItem>
      </Link>
      <Link to={`/user/addproduct/${id}`} className={classes.link}>
        <Tooltip title="Agregar producto">
          <ListItem button>
            <ListItemIcon>
              <PublicIcon/>
            </ListItemIcon>
            <ListItemText primary="Nueva Publicacion" />
          </ListItem>
        </Tooltip>
      </Link>
      <Link to={`/user/chat/${id}`} className={classes.link}>
        <Tooltip title="Ir a Mensajes">
          <ListItem button>
            <ListItemIcon>
              <ChatIcon/>
            </ListItemIcon>
            <ListItemText primary="Mensajes" />
          </ListItem>
        </Tooltip>
      </Link>
      <Link to={`/user/yourbuys/${id}`} className={classes.link}>
        <Tooltip title="Ir a Compras">
          <ListItem button>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Mis compras" />
          </ListItem>
        </Tooltip>
      </Link>
    </Fragment>
  );
};

export default ListDrawer;
