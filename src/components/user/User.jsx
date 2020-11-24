import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { withRouter } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import firebase from "../../config/firebase";
import CustomAvatar from "./CustomAvatar";

const User = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  //esta funcion va a mandar a llamar a la funcion de onLogout que resiva como propiedad
  const handleLogout = () => {
    setAnchorEl(null);
    firebase
      .auth()
      .signOut()
      .then(() => {
        if (props.onLogout) props.onLogout();
        props.history.push("/login");
      });
  };
  console.log(props.user);
  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        {props.user && (
          <CustomAvatar name={props.user.name} avatar={props.user.avatar} size="sm" />
        )}
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
      >
        {props.user && <MenuItem disabled>{props.user.name}</MenuItem>}
        <MenuItem onClick={handleLogout}>Salir</MenuItem>
      </Menu>
    </div>
  );
};

export default withRouter(User);
