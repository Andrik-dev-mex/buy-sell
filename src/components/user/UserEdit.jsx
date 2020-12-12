import React, { useEffect, useState} from "react";
import firebase from "../../config/firebase";
import { loadUser } from "../../utils/dbUtils";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink, withRouter } from "react-router-dom";
import { Link } from "@material-ui/core";
import {
  Button,
  TextField,
  Avatar,
  Typography,
  Grid,
  Paper,
} from "@material-ui/core";
import AlertSnack from "../../AlertSnack";
import { Camera as CameraIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: 150,
    width: 150,
    marginBottom: 5,
  },
  container: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  form: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
  button: {
    marginTop: 10,
  },
  input: {
    display: "none",
  },
}));

const MyLink = React.forwardRef((props, ref) => (
  <RouterLink ref={ref} {...props} />
));

const UserEdit = (props) => {
  document.title = "Editar Mis Datos";
  const classes = useStyles();

  const { currentUser } = firebase.auth();
  const db = firebase.database();
  const storage = firebase.storage();

  const [user, setUser] = useState({
    name: "",
    lastname: "",
    avatar: "",
    location: "",
    email: "",
    password: "",
    city: "",
    street: "",
    numberIntStreet: "",
    numberExtStreet: "",
    phone: "",
  });

  const [alertOption, setAlertOptions] = useState({
    open: false,
    message: "",
    variant: "",
  });

  const [image, setImage] = useState(null);

  const [fullname, setFullName] = useState("");

  const handleChangeImage = (e) => {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    setImage({
      type: file.type.split("/")[1],
      file,
    });
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser();
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOptions({
      ...alertOption,
      open: false,
    });
  };

  const updateUser = () => {
    const refUser = db.ref(`/users/${currentUser.uid}`);
    if (image) {
      user.avatar = `${currentUser.uid}.${image.type}`;
      storage
        .ref(`/avatars/${user.avatar}`)
        .put(image.file)
        .then(() => {
          firebase
            .storage()
            .ref()
            .child(`/avatars/${user.avatar}`)
            .getDownloadURL()
            .then((url) => {
              setUser({ ...user, avatar: url });
            });
        });
    }

    refUser
      .update(user)
      .then((response) => {
        setAlertOptions({
          open: true,
          message: "Usuario Actualizado",
          variant: "success",
        });
        setTimeout(() => {
          props.history.push("/");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        setAlertOptions({
          open: true,
          message: "Error al actulizar usuario",
          variant: "error",
        });
      });
  };

  useEffect(() => {
    if (currentUser) {
      const refUser = db.ref(`/users/${currentUser.uid}`);
      refUser.on(
        "value",
        (snapshot) => {
          loadUser(snapshot.key).then((data) => {
            setUser(data);
            setFullName(data.name + " " + data.lastname);
          });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      props.history.push("/login");
    }
    //eslint-disable-next-line
  }, [currentUser]);

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Paper className={classes.container} elevation={3}>
        <Typography variant="h4" color="initial">
          Mis Datos Personales
        </Typography>
        <Avatar src={user.avatar} className={classes.avatar} />
        <Typography variant='subtitle1' color="initial">
          {fullname}
        </Typography>
        <Link to="/user/updatepassword" component={MyLink}>
          {"Actualizar mi Contraseña"}
        </Link>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            label="Nombre"
            name="name"
            onChange={handleChange}
            value={user.name}
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            label="Apellidos"
            name="lastname"
            onChange={handleChange}
            variant="outlined"
            value={user.lastname}
            fullWidth
            required
          />
          <TextField
            variant="outlined"
            label="Correo Electronico"
            name="email"
            onChange={handleChange}
            value={user.email}
            fullWidth
            required
          />
          <TextField
            variant="outlined"
            label="Localidad"
            name="location"
            fullWidth
            onChange={handleChange}
            value={user.location}
            required
          />
          <TextField
            variant="outlined"
            label="Ciudad"
            name="city"
            fullWidth
            onChange={handleChange}
            value={user.city}
            required
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Calle"
            name="street"
            onChange={handleChange}
            value={user.street}
            required
          />
          <TextField
            variant="outlined"
            label="# Interior"
            fullWidth
            name="numberIntStreet"
            onChange={handleChange}
            value={user.numberIntStreet}
          />
          <TextField
            variant="outlined"
            label="# Exterior"
            name="numberExtStreet"
            fullWidth
            onChange={handleChange}
            value={user.numberExtStreet}
            required
          />
          <TextField
            variant="outlined"
            label="Telefono"
            name="phone"
            fullWidth
            onChange={handleChange}
            value={user.phone}
            required
          />

          <label htmlFor="fileImg">
            <Button
              variant="contained"
              startIcon={<CameraIcon />}
              component="span"
              color="secondary"
              className={classes.button}
              fullWidth
            >
              Avatar
            </Button>
          </label>
          <input
            accept="image/*"
            className={classes.input}
            id="fileImg"
            type="file"
            onChange={handleChangeImage}
          />
          <Button fullWidth variant="contained" color="primary" type="submit">
            Guardar
          </Button>
        </form>
      </Paper>
      <AlertSnack
      open={alertOption.open}
      message={alertOption.message}
      variant={alertOption.variant}
      handleClose={handleClose}
      />
    </Grid>
  );
};

export default withRouter(UserEdit);
