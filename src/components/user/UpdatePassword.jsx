import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Typography } from "@material-ui/core";
import firebase from "../../config/firebase";
import AlertSnack from "../../AlertSnack";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

const UpdatePassword = (props) => {
  const classes = useStyles();
  const { currentUser } = firebase.auth();
  const [secret, setSecret] = useState({
    password: "",
    verifypassword: "",
  });
  
  const [alertOptions, setAlertOptions] = useState({
    open: false,
    variant: "",
    message: "",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOptions({
      ...alertOptions,
      open: false,
    });
  };

  const handleChange = (e) => {
    setSecret({
      ...secret,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    confPassword();
  };

  const confPassword = () => {
    currentUser
      .updatePassword(secret.password)
      .then((response) => {
        console.log(response);
        setAlertOptions({
          open: true,
          message: "Contraseña Actualizada con exito",
          variant: "success",
        });
        setTimeout(() => {
          props.history.push("/user/edit");
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
        setAlertOptions({
          open: true,
          message: "Error al actualizar la contraseña",
          variant: "error",
        });
      });
  };

  const verifyLength = () => {
    return secret.password.length &&
      secret.verifypassword.length &&
      secret.password === secret.verifypassword
      ? false
      : true;
  };

  console.log(secret);
  return (
    <div className={classes.container}>
      <Typography variant="h4" color="initial">
        Actualizar Contraseña
      </Typography>
      <form className={classes.root} onSubmit={handleSubmit}>
        <div>
          <TextField
            type="password"
            label="Contraseña"
            name="password"
            variant="outlined"
            onChange={handleChange}
            error={secret.password !== secret.verifypassword}
          />
        </div>
        <div>
          <TextField
            type="password"
            variant="outlined"
            label="Repite tu Contraseña"
            name="verifypassword"
            onChange={handleChange}
            error={secret.password !== secret.verifypassword}
          />
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            disabled={verifyLength()}
            type="submit"
            fullWidth
          >
            Actualizar
          </Button>
        </div>
      </form>
      <AlertSnack
        open={alertOptions.open}
        message={alertOptions.message}
        variant={alertOptions.variant}
        handleClose={handleClose}
      />
    </div>
  );
};

export default withRouter(UpdatePassword);
