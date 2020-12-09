import React from "react"
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  containerButton:{
    height: 300,
    display: "flex",
    justifyContent:"center",
    alignItems:"center"
  }
}));

const StepTree = ({click}) => {
  const classes = useStyles();
  return (
    <div className={classes.containerButton}>
      <Button variant="contained" color="primary" onClick={click}>
        Guargar Publicacion 
      </Button>
    </div>
  );
};

export default StepTree;