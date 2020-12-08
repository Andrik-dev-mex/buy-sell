import React, { useEffect, useState } from "react";
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
import firebase from "../../config/firebase";
import { googleProvider } from "../../config/firebase";
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

function Login(props) {
  const classes = useStyles();
  const { currentUser } = firebase.auth();
  const [user, setUser] = useState({
    email: "",
    password: "",
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
    // google login
  };

  const handleLoginWithGoogle = (e) => {
    loginWithGoogle();
  };

  const loginWithGoogle = () => {
    const provider = googleProvider;

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const { uid, displayName, email, photoURL } = result.user;
        const data = displayName.split(" ");
        const name = data[0];
        //consultamos a firebase para saber si el usuario existe
        firebase
          .database()
          .ref(`users/${uid}`)
          .once("value")
          .then((snapshot) => {
            //si no existe vamos a guardarlo en firebase
            //si existe solo redirecionamos
            if (snapshot.val() === null) {
              firebase.database().ref(`/users/${uid}`).set({
                name: name,
                lastname: "",
                email: email,
                avatar: photoURL,
              });
              setTimeout(() => {
                props.history.push("/");
              }, 1000);
              window.location.reload();
            } else {
              props.history.push("/");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (currentUser) {
      props.history.push("/");
    } else {
    }
  }, [currentUser, props]);
  //aqui es cuando el usuario le de en ingresar nos autentique con firebase

  const handleLogin = (e) => {
    e.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((response) => {
        props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
        // alert(error.message);
        setAlertOptions({
          open: true,
          message: "Error",
          variant: "error",
        });
      });
  };

  console.log(currentUser);
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Ingresar a Buy Sell
          </Typography>
          <form className={classes.form} onSubmit={handleLogin}>
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

            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className="btn btn-info btn-block"
              onClick={handleLoginWithGoogle}
            >
              Login con Google
            </Button>

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
                <Link to="/registrer" component={MyLink} variant="body2">
                  {"No tengo una cuenta"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <AlertSnack
          open={alertOptions.open}
          message={alertOptions.message}
          variant={alertOptions.variant}
        />
      </Grid>
    </Grid>
  );
}

export default withRouter(Login);
