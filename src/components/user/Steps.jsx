import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, FormControl, InputLabel, Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(3),
    },
  },
  container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  formControl: {
    margin: theme.spacing(3),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const StepOne = ({ handleChange, product }) => {
  const classes = useStyles();

  console.log(product);
  return (
    <div className={classes.container}>
      <form className={classes.root}>
        <TextField
          label="Nombre"
          name="name"
          value={product.name}
          onChange={handleChange}
        />
        <TextField
          label="Marca"
          name="brand"
          value={product.brand}
          onChange={handleChange}
        />
        <TextField
          label="Descripción"
          name="description"
          value={product.description}
          onChange={handleChange}
        />
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
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
      <FormControl className={classes.formControl}>
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
      </form>
    </div>
  );
};

export const StepTwo = () => {
  return <div></div>;
};

export const StepTree = () => {
  return <div></div>;
};
