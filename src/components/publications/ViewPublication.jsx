import React, { useState, useEffect, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import firebase from "../../config/firebase";
import { loadPublication } from "../../utils/dbUtils";
import { Grid, Button, Paper, Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AlertSnack from "../../AlertSnack";
import Loading from "../Card/Loading";
import Dialog from "../Card/Dialog";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 15,
  },
  buttonGroup: {
    height: 450,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 10,
    border: 1,
    borderRadius: 10,
    borderStyle: "solid",
    borderColor: "#ccc",
    "& > *": {
      marginTop: theme.spacing(1),
    },
  },
  image: {
    width: "100%",
    height: 450,
    border: 2,
    borderRadius: 10,
    borderStyle: "solid",
    borderColor: "#000",
  },
  image2: {
    width: "100%",
    height: 70,

    border: 1,
    borderRadius: 10,
    borderStyle: "solid",
    borderColor: "#ccc",
  },
}));

const ViewPublication = (props) => {
  document.title = "Ver Datos";
  const { id } = props.match.params;
  const classes = useStyles();
  const db = firebase.database();
  const refPublication = db.ref(`/publications/${id}`);

  const [publication, setPublication] = useState({
    name: "",
    brand: "",
    description: "",
    state: "",
    price: "",
    image: "",
    category: "",
    descriptionExtended: "",
    typeOfBuy: "",
    propietary: {
      name: "",
      image: "",
      userID: "",
    },
    createAt: "",
    key: "",
  });

  const [openDialog, setOpenDialog] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    setLoading(true);
    refPublication.on(
      "value",
      (snapshot) => {
        const newPublication = snapshot.val();
        newPublication.key = snapshot.key;
        loadPublication(snapshot.key)
          .then((data) => {
            newPublication.image = data.image;
            setPublication(newPublication);
            setLoading(false);
          })
          .catch((error) => {});
      },
      (error) => {
        console.log(error);
        if (error.message.includes("permission_denied")) {
          props.history.push("/login");
        }
      }
    );

    return function cleanup() {
      setPublication({});
    };
    //eslint-disable-next-line
  }, []);
  console.log(publication);
  return (
    <Fragment>
      <Loading open={loading} />
      <Dialog open = {openDialog} handleClose={handleClose}/>
      <Grid container>
        <Grid item xs={12}>
          <Paper elevation={3} className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs={1}>
                <img
                  src={publication.image}
                  alt="product"
                  className={classes.image2}
                />
              </Grid>
              <Grid item xs={4}>
                <img
                  src={publication.image}
                  alt="product"
                  className={classes.image}
                />
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h4" color="textPrimary">
                  {publication.name}
                </Typography>
                <Typography variant="h5" color="initial">
                  {publication.typeOfBuy === "buy" ? "Venta" : "Cambio"}
                </Typography>
                <Typography variant="h5" color="initial">
                  {"Vendedor: " + publication.propietary.name}
                </Typography>
                <Typography variant="h5" color="initial">
                  {"Precio: $" + publication.price}
                </Typography>
                <Divider />
                <Typography variant="h5" color="textSecondary">
                  {"Fecha de Pub: " + publication.createAt}
                </Typography>
                <Typography variant="h5" color="textSecondary">
                  {"Marca: " + publication.brand}
                </Typography>
                <Typography variant="h5" color="textSecondary">
                  {"Categoría: " + publication.category}
                </Typography>
                <Divider />
                <Typography variant="h5" color="textPrimary">
                  {"Descripción"}
                </Typography>
                <Typography variant="h5" color="textSecondary" justify>
                  {publication.descriptionExtended}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <div className={classes.buttonGroup}>
                  <Button fullWidth variant={"contained"} color="primary" onClick={handleClickOpen}>
                    Comprar
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default withRouter(ViewPublication);
