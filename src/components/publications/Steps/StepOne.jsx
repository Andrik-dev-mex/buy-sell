import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Radio
}
from "@material-ui/core"

const useStyles = makeStyles(theme => ({
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
    '& > *' : {
      marginTop:35,
    },
  },
  containerButton:{
    height: 300,
    display: "flex",
    justifyContent:"center",
    alignItems:"center"
  }
}));

const StepOne = ({ handleChange, product, handleImage }) => {
  const classes = useStyles();
  document.title = "Nueva Publicación";
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
                  required
                />
                <TextField
                  label="Marca"
                  name="brand"
                  value={product.brand}
                  onChange={handleChange}
                  fullWidth
                  required
                />
                <TextField
                  label="Descripción"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  fullWidth
                  required
                />
                <FormControl className={classes.formControl} fullWidth required>
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
                <FormControl className={classes.formControl} fullWidth required>
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
                  InputProps={{ inputProps: { min: 1 } }}
                  fullWidth
                  required
                />
                <label htmlFor="fileImage">
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    component="span"
                    fullWidth
                  >
                    Subir Imagen
                  </Button>
                </label>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="fileImage"
                  type="file"
                  onChange={handleImage}
                />
              </Grid>
              <Grid item xs={8}>
                <Grid container>
                  <Grid item xs={6}>
                    <Radio
                      checked={product.typeOfBuy === "buy"}
                      onChange={handleChange}
                      value="buy"
                      name="typeOfBuy"
                      inputProps={{ "aria-label": "Venta" }}
                      id="buy"
                    />
                    <label htmlFor="buy">Venta</label>
                  </Grid>
                  <Grid item xs={6}>
                    <Radio
                      id="change"
                      checked={product.typeOfBuy === "change"}
                      onChange={handleChange}
                      value="change"
                      name="typeOfBuy"
                      inputProps={{ "aria-label": "Cambio" }}
                    />
                    <label htmlFor="change">Cambio</label>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12}>
                    <TextField
                      label="Descripción Larga"
                      multiline
                      rows={14}
                      name="descriptionExtended"
                      value={product.descriptionExtended}
                      variant="outlined"
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};

export default StepOne;