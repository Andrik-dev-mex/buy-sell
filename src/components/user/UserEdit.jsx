import React, { useEffect, useState, Fragment } from "react";
import firebase from "../../config/firebase";
import { loadUser } from "../../utils/dbUtils";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink, withRouter } from "react-router-dom";
import { Grid, Link, Paper, TextField, Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "1000px",
    "& > *": {
      margin: theme.spacing(2),
    },
  },
  avatar : {
    width: 150,
    height:150
  }
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
  const [open, setOpen] = useState(false);
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
      setOpen(true);
      firebase
        .database()
        .ref(`/users/${currentUser.uid}`)
        .once("value")
        .then((snapshot) => {
          loadUser(snapshot.key).then((data) => {
            setUser(data);
            setFullName(data.name + " " + data.lastname);
          });
        });
      setOpen(false);
    } else {
      props.history.push("/login");
    }
    //eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      <Grid
        container
        spacing={1}
        direction="row"
        justify="center"
        alignItems="center"
        alignContent="center"
        wrap="nowrap"
      >
        <Avatar src={user.avatar} className={classes.avatar} />
      </Grid>
      <Grid container>
        <TextField label="nombre"></TextField>
      </Grid>
    </Fragment>
  );
};

export default withRouter(UserEdit);
