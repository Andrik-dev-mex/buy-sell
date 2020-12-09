import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  Grid,
  Paper,
  Radio,
  Button,
  MenuItem,
  Typography,
} from "@material-ui/core";

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
    '& > *' : {
      marginTop:35,
    },
  },
  
}));






