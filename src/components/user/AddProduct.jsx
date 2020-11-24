import React, {Fragment, useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  containerForm: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  }
}));

const AddProduct = () => {
  const classes = useStyles();
  const [product, setProduct] = useState({
    name: "",

  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name] : e.target.value,
    });
  };

  return (
    <Fragment>
      <div className={classes.container}>
        <Typography variant="h4">Completa los Datos de Tu Producto</Typography>
      </div>
      <div className ={classes.containerForm}>
        <form className={classes.root}>
          <TextField name="name" label="Nombre" onChange={handleChange}/>
          <TextField name="" label="Marca" onChange={handleChange}/>
          <TextField name="description" label="Descripción" onChange={handleChange}/>
        </form>
      </div>
    </Fragment>
  );
};

export default AddProduct;
