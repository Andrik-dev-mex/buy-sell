import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import AlertSnack from "../../AlertSnack";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Link } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink, withRouter } from "react-router-dom";

import firebase from '../../config/firebase';

//este es para el link
const MyLink = React.forwardRef((props, ref) => (
  <RouterLink ref={ref} {...props} />
));
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://andro4all.com/files/2020/09/Fondo-de-pantalla-del-espacio.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Registrer(props) {
  const classes = useStyles();
  const [user, setUser] = useState({
    name: "",
    lastname: '',
    avatar: "",
    location: "",
    email: "",
    password: "",
    city: "",
    street: "",
    phone: "",
    numberIntStreet: "",
    numberExtStreet: ""
  });

  const [alertOptions, setAlertOptions] = useState({
    open: false,
    variant: "",
    message: "",
  });

  const handlechange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOptions({
      ...alertOptions,
      open : false,
    });
  };
  //aqui es cuando el usuario le de en ingresar nos autentique con firebase

  const handleSubmit = (e) => {
    e.preventDefault();

    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((response) => {
        //guardar los datos del usuario
        delete user.password;
        firebase.database().ref(`/users/${response.user.uid}`).set(user);
        //alert('Bienvenido a Chat App');
        setAlertOptions({
          variant: "success",
          message: "Usuario creado con exito",
          open: true,
        });
        props.history.push("/");
      })
      .catch((error) => {
        //alert(error.message);
        setAlertOptions({
          variant: "error",
          message: "error al crear usuario " + error.message,
          open: true,
        });
      });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Registrate en Buy Sell
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} validate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nombre"
              name="name"
              autoComplete="name"
              autoFocus
              defaultValue={user.name}
              onChange={handlechange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastname"
              label="Apellidos"
              name="lastname"
              autoComplete="LastName"
              autoFocus
              defaultValue={user.LastName}
              onChange={handlechange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electronico"
              name="email"
              autoComplete="email"
              autoFocus
              defaultValue={user.email}
              onChange={handlechange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              defaultValue={user.password}
              onChange={handlechange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Telefono"
              name="phone"
              autoComplete="phone"
              autoFocus
              defaultValue={user.phone}
              onChange={handlechange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Location"
              label="Localidad"
              name="location"
              autoComplete="Location"
              autoFocus
              defaultValue={user.Location}
              onChange={handlechange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Ingresar
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/login" component={MyLink} variant="body2">
                  {"Si tengo una cuenta"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <AlertSnack
          open={alertOptions.open}
          message={alertOptions.message}
          variant={alertOptions.variant}
          handleClose={handleClose}
        />
      </Grid>
    </Grid>
  );
}

export default withRouter(Registrer);
