import React, { useEffect, useState } from "react";
import firebase from "../../config/firebase";
import { loadUser } from "../../utils/dbUtils";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, TextField, Button } from "@material-ui/core";
import CameraIcon from "@material-ui/icons/Camera";
import AlertSnack from "../../AlertSnack";
import { Link as RouterLink, withRouter } from "react-router-dom";
import { Link } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    marginLeft: "150px",
    marginRight: "100px"
  },
  containerAvatar: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    height: "150px",
    width: "150px",
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  submit: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    display: "none",
  },
  button: {
    marginTop: "20px",
  },
  containerLink: {
    display: "flex",
    width: "75%",
    justifyContent: "flex-end",
  },
}));

const MyLink = React.forwardRef((props, ref) => (
  <RouterLink ref={ref} {...props} />
));

const UserEdit = (props) => {
  const classes = useStyles();
  const { currentUser } = firebase.auth();
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
    if (image) {
      user.avatar = `${currentUser.uid}.${image.type}`;
      firebase
        .storage()
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

    const userRef = firebase.database().ref(`/users/${currentUser.uid}`);
    userRef
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
      firebase
        .database()
        .ref(`/users/${currentUser.uid}`)
        .once("value")
        .then((snapshot) => {
          loadUser(snapshot.key).then((data) => {
            setUser(data);
          });
        });
    } else {
      props.history.push("/login");
    }
    //eslint-disable-next-line
  }, []);
  return (
    <div style={{width: "100%"}}>
      <div className={classes.containerAvatar}>
        <Avatar className={classes.avatar} src={user.avatar} />
        <Typography variant="h5" color="initial">
          {user.name + " " + user.lastname}
        </Typography>
      </div>
      <div className={classes.container}>
        <form
          onSubmit={handleSubmit}
          className={classes.root}
          validate
          autoComplete="off"
        >
          <TextField
            label="Nombre"
            name="name"
            onChange={handleChange}
            value={user.name}
            required
          />
          <TextField
            label="Apellidos"
            name="lastname"
            onChange={handleChange}
            value={user.lastname}
            required
          />
          <TextField
            label="Correo Electronico"
            name="email"
            onChange={handleChange}
            value={user.email}
            required
          />
          <TextField
            label="Localidad"
            name="location"
            onChange={handleChange}
            value={user.location}
            required
          />
          <TextField
            label="Ciudad"
            name="city"
            onChange={handleChange}
            value={user.city}
            required
          />
          <TextField
            label="Calle"
            name="street"
            onChange={handleChange}
            value={user.street}
            required
          />
          <TextField
            label="# Interior"
            name="numberIntStreet"
            onChange={handleChange}
            value={user.numberIntStreet}
          />
          <TextField
            label="# Exterior"
            name="numberExtStreet"
            onChange={handleChange}
            value={user.numberExtStreet}
            required
          />
          <TextField
            label="Telefono"
            name="phone"
            onChange={handleChange}
            value={user.phone}
            required
          />

          <label htmlFor="fileImg">
            <Button
              variant="outlined"
              startIcon={<CameraIcon />}
              component="span"
              color="secondary"
              className={classes.button}
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
          <div className={classes.submit}>
            <Button variant="contained" color="primary" type={"submit"}>
              Guardar
            </Button>
          </div>
        </form>
        <AlertSnack
          message={alertOption.message}
          open={alertOption.open}
          variant={alertOption.variant}
          handleClose={handleClose}
        />
      </div>
      <div className={classes.containerLink}>
        <Link to={`/user/updatepassword/`} component={MyLink} variant="body2">
          {"Actualizar Contraseña"}
        </Link>
      </div>
    </div>
  );
};

export default withRouter(UserEdit);
