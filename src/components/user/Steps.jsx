import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  Grid,
} from "@material-ui/core";
import { MenuItem } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
    },
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginLeft: "150px",
    marginRight: "100px",
  },
  formControl: {
    margin: theme.spacing(2),
    width: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const StepOne = ({ handleChange, product }) => {
  const classes = useStyles();

  console.log(product);
  return (
    <form className={classes.root}>
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs>
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
        </Grid>
      </Grid>
    </form>
  );
};

export const StepTwo = () => {
  return <div></div>;
};

export const StepTree = () => {
  return <div></div>;
};
