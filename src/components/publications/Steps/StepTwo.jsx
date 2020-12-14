import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography, Button, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 15,
    marginBottom: 5
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

const StepTwo = ({ image, product }) => {
  const URL_IMAGE = URL.createObjectURL(image.file);
  const classes = useStyles();

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12}>
          <Paper elevation={3} className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs={1}>
                <img
                  src={URL_IMAGE}
                  alt="product"
                  className={classes.image2}
                />
              </Grid>
              <Grid item xs={4}>
                <img src={URL_IMAGE} alt="product" className={classes.image} />
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h4" color="textPrimary">
                  {product.name}
                </Typography>
                <Typography variant="h5" color="initial">
                  {product.typeOfBuy === "buy" ? "Venta" : "Cambio"}
                </Typography>
                <Typography variant="h5" color="initial">
                  {"Precio: $" + product.price}
                </Typography>
                <Divider />
                <Typography variant="h5" color="textSecondary">
                  {"Fecha de Pub: " + product.createAt}
                </Typography>
                <Typography variant="h5" color="textSecondary">
                  {"Marca: " + product.brand}
                </Typography>
                <Typography variant="h5" color="textSecondary">
                  {"Categoría: " + product.category}
                </Typography>
                <Divider />
                <Typography variant="h5" color="textPrimary">
                  {"Descripción"}
                </Typography>
                <Typography variant="h5" color="textSecondary" justify>
                  {product.descriptionExtended}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <div className={classes.buttonGroup}>
                  <Button fullWidth variant={"contained"} color="primary">
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

export default StepTwo;
