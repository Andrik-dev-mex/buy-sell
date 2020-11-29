import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  Grid,
  Paper,
  Radio
} from "@material-ui/core";
import { MenuItem } from "@material-ui/core";

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
}));

export const StepOne = ({ handleChange, product }) => {
  const classes = useStyles();
  console.log(product);
  return (
    <form className={classes.root}>
      <Paper elevation={3}>
        <Grid container className={classes.container}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  label="Nombre"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Marca"
                  name="brand"
                  value={product.brand}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Descripción"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  fullWidth
                />
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Categoria
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                  >
                    <MenuItem value={"Electronica"}>Electronica</MenuItem>
                    <MenuItem value={"Casa y Hogar"}>Casa y Hogar</MenuItem>
                    <MenuItem value={"Vehiculos"}>Vehiculos</MenuItem>
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel id="demo-simple-select">Condicion</InputLabel>
                  <Select
                    labelId="demo-simple-select"
                    id="demo-simple-select1"
                    name="state"
                    value={product.state}
                    onChange={handleChange}
                  >
                    <MenuItem value={"new"}>Nuevo</MenuItem>
                    <MenuItem value={"used"}>Usado</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Precio"
                  name="price"
                  value={product.price}
                  type={"number"}
                  onChange={handleChange}
                  InputProps={{ min: 1 }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={8}>
                <Radio
                  checked={product.typeOfBuy === "buy"}
                  onChange={handleChange}
                  value="buy"
                  name="typeOfBuy"
                  inputProps={{ "aria-label": "A" }}
                />
                <Radio
                  label="Cambio"
                  checked={product.typeOfBuy === "change"}
                  onChange={handleChange}
                  value="change"
                  name="typeOfBuy"
                  inputProps={{ "aria-label": "Cambio" }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};

export const StepTwo = () => {
  return <div></div>;
};

export const StepTree = () => {
  return <div></div>;
};
