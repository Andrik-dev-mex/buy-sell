import React, { Fragment, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import firebase from "../config/firebase";
import { loadPublication } from "../utils/dbUtils";
import { makeStyles } from "@material-ui/core/styles";
import CardPublication from "./Card/CardPublication";
import Loading from "./Card/Loading";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(2),
    },
  },
  containerForm: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 10,
    marginLeft: 10
  },
  text: {
    width: 300
  }
}));

function Home(props) {
  document.title = "Inicio";
  const classes = useStyles();
  const db = firebase.database();
  const [view, setView] = useState({
    publications: [],
  });

  const [query, setQuery] = useState({
    search: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchPublication();
  };

  const searchPublication = () => {
    let container = []; 
    setView({ ...view, publications: [] });

    const refPublications = db.ref("publications").limitToFirst(30);
    setLoading(true);
    refPublications
      .orderByChild("toSearch/name")
      .startAt(query.search.toLowerCase())
      .on("child_added", (snapshot) => {
        const newPublication = snapshot.val();
        newPublication.key = snapshot.key;
        loadPublication(snapshot.key)
          .then((data) => {
            newPublication.image = data.image;
            container.push(newPublication);
            setView({
              ...view,
              publications: container,
            });
            setLoading(false);
          })
          .catch((error) => {
          });
      });
  };

  useEffect(() => {
    const container = [];
    const publicationRef = firebase.database().ref("/publications");
    
    publicationRef.on(
      "child_added",
      (snapshot) => {
        setLoading(true);
        const newPublication = snapshot.val();
        loadPublication(snapshot.key)
          .then((res) => {
            newPublication.key = snapshot.key;
            newPublication.image = res.image;
            container.push(newPublication);
            setView({
              ...view,
              publications: container,
            });
            setLoading(false);
          })
          .catch((error) => {
          });
      },
      (error) => {
        if (error.message.includes("permission_denied")) {
          props.history.push("/login");
        }
      }
    );

    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Loading open={loading} />
      <div className={classes.containerForm}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Buscar Producto"
            name="search"
            onChange={handleChange}
            autoFocus
            className={classes.text}
            variant="standard"
          />
          <Button variant="contained" color="primary" className={classes.button} type="submit">
            Buscar
          </Button>
        </form>
      </div>
      <div className={classes.container}>
        {view.publications.length > 0 &&
          view.publications.map((publi, index) => (
            <CardPublication
              name={publi.name}
              key={index}
              brand={publi.brand}
              description={publi.description}
              state={publi.state}
              price={publi.price}
              image={publi.image}
              category={publi.category}
              descriptionExtended={publi.descriptionExtended}
              typeOfBuy={publi.typeOfBuy}
              keyID={publi.key}
              namePropietary={publi.propietary.name}
              lastnamePropietary={publi.propietary.lastname}
              imagePropietary={publi.propietary.image}
            />
          ))}
      </div>
    </Fragment>
  );
}

export default withRouter(Home);
