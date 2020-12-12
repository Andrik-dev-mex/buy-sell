import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { Button, CardActions } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    width: 300
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Target({
  name,
  brand,
  description,
  state,
  price,
  image,
  category,
  descriptionExtended,
  typeOfBuy,
  namePropietary,
  imagePropietary,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.root} >
      <CardHeader
        avatar={
          //modificacion
          <Avatar
            src={imagePropietary}
            aria-label="recipe"
            className={classes.avatar}
          ></Avatar>
        }
        title={namePropietary}
        subheader=""
      />
      <CardMedia 
        className={classes.media}
        //modificacion
        image={image}
        title={name}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {name} ${price}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="secondary" fullWidth>
          Ver mas
        </Button>
      </CardActions>
    </Card>
  );
}
