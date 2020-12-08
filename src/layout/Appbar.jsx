import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));



export default function AppbarDrawer(props) {
  
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      {props.content}
    </div>
  );
}
