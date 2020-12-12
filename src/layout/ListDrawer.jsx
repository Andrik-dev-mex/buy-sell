import React, { Fragment } from "react";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ListItemText from "@material-ui/core/ListItemText";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import {
  Tooltip,
  ListItem,
  ListItemIcon,
  List,
  ListItemAvatar,
  Avatar,
  Typography,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import ChatIcon from "@material-ui/icons/Chat";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: "black",
    "&:hover": {
      textDecoration: "none",
      color: "black",
    },
  },
  avatar: {
    display: "flex",
    justifyContent: "center",
  },
  imageAvatar: {
    height: "120px",
    width: "120px",
  },
}));

const ListDrawer = ({ image, name, lastname }) => {
  const classes = useStyles();
  console.log(image);
  return (
    <Fragment>
      <div className={classes.avatar}>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar src={image} className={classes.imageAvatar} />
            </ListItemAvatar>
          </ListItem>
        </List>
      </div>
      <div className={classes.avatar}>
        <Typography variant="body1" color="initial">
          {name + " " + lastname}
        </Typography>
      </div>
      <Divider />
      <Link to={`/`} className={classes.link}>
        <Tooltip title="Ir a Inicio">
          <ListItem button>
            <ListItemIcon>
              <HomeIcon/>
            </ListItemIcon>
            <ListItemText primary="Inicio" />
          </ListItem>
        </Tooltip>
      </Link>
      <Link to={`/user/edit/`} className={classes.link}>
        <Tooltip title="Ir a Mi Perfil">
          <ListItem button>
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Mi Perfil" />
          </ListItem>
        </Tooltip>
      </Link>
      <Link to={`/user/notifications/`} className={classes.link}>
        <ListItem button>
          <ListItemIcon>
            <NotificationsActiveIcon />
          </ListItemIcon>
          <ListItemText primary="Notificaciones" />
        </ListItem>
      </Link>
      <Link to={`/user/chats/`} className={classes.link}>
        <Tooltip title="Ir a Mensajes">
          <ListItem button>
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary="Mensajes" />
          </ListItem>
        </Tooltip>
      </Link>
      <Link to={`/user/yourbuys/`} className={classes.link}>
        <Tooltip title="Ir a Compras">
          <ListItem button>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Mis compras" />
          </ListItem>
        </Tooltip>
      </Link>
      <Link to={`/user/publications/`} className={classes.link}>
        <Tooltip title="Ir a Mis Publicaciones">
          <ListItem button>
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Mis Publicaciones" />
          </ListItem>
        </Tooltip>
      </Link>
    </Fragment>
  );
};

export default ListDrawer;
