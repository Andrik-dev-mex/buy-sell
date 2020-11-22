import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

/*Bro con este componente vamos a mostrar alertas
  para usarlo solo en el componente que vas a implementarlo agregas
  un State asi:
  const [alertOptions, setAlertOptions] = useState({
    open: false,
    variant: "",
    message: "",
  })
  la funcion handleClose es esta:
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertData({
      ...alertData,
      open : false,
    });
  };
  las variantes son success, warning, error e info
*/ 

export default function AlertSnack({ open, variant, message, handleClose }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={variant}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}