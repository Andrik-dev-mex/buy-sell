import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
    },
  },
  formControl: {
    margin: theme.spacing(0),
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
  container: {
    padding: "1em",
  },
  input: {
    display: "none",
  },
  button: {
    marginTop: 10,
  },
  image: {
    width: "100%",
    height: "450px",
  },
  title: {
    textAlign: "center",
  },
  data: {
    "& > *": {
      marginTop: 35,
    },
  },
  containerButton: {
    height: 300,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const StepTwo = ({ image, product }) => {
  const URL_IMAGE = URL.createObjectURL(image.file);
  const classes = useStyles();
  return (
    <Paper elevation={3} style={{ padding: 12 }}>
      <Grid container>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <img src={URL_IMAGE} alt="product" className={classes.image} />
              <Typography
                variant="subtitle1"
                color="initial"
                className={classes.title}
              >
                {product.name} {product.brand}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <div className={classes.data}>
                <Typography variant="h6" color="initial">
                  Condición: {product.state === "used" ? " Articulo Usado" : ""}
                </Typography>
                <Typography variant="h5" color="initial">
                  Precio: ${product.price} MXN
                </Typography>
                <Typography variant="h5" color="initial">
                  Categoría: {product.category}
                </Typography>
                <Typography variant="h5" color="initial">
                  Modalidad: {product.typeOfBuy === "buy" ? "Venta" : "Cambio"}
                </Typography>
                <Button variant="contained" color="primary" fullWidth>
                  Comprar
                </Button>
                <Typography variant="subtitle1" color="initial" justify>
                  Tus datos estan seguros, puedes realizar tu compra y pagar con
                  tus targetas visa o mastercard, revisa disponibilidad de msi
                  con tu banco.
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default StepTwo;