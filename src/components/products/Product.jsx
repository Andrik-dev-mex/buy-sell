import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListProducts from "./ListProducts";
import Button from "@material-ui/core/Button";
import firebase from "../../config/firebase";
import { loadProduct } from "../../utils/dbUtils";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    display: "flex",
    margin: "10px",
    marginLeft: "10px",
    marginRight: "10px",
  },
  containerButton: {
    display: "flex",
    padding: "10px",
  },
  link: {
    textDecoration: "none",
    color: "white",
    
  },
}));

function Products(props) {
  const classes = useStyles();
  const [products, setProducts] = useState([]);

  const addProduct = (product) => {
    products.push(product);
    setProducts([...products]);
  };

  const deleteProduct = async (id, nameImage) => {
    try {
      const ref = firebase.database().ref(`/products/${id}`);
      const refImage = firebase.storage().ref(`/images/${nameImage}`);
      await refImage.delete();
      await ref.remove();
      window.location.reload({forcedRealod : true})
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const refProducts = firebase.database().ref("/products");

    refProducts.on(
      "child_added",
      (snapshot) => {
        const productItem = snapshot.val();
        productItem.id = snapshot.key;
        const deleteImage = productItem.image;
        loadProduct(snapshot.key)
        .then(data => {
          productItem.image = data.image;
          productItem.oldImage = deleteImage;
          addProduct(productItem);
        })
      },
      (error) => {
        console.log(error);
        if (error.message.includes("permission_denied")) {
          props.history.push("/login");
        }
      }
    );
  }, []);
  console.log(products);
  return (
    <div>
      <div className={classes.containerButton}>
        <Button variant="contained" color="primary">
          <Link to={"/addproduct"} className={classes.link}>
            Nuevo Producto
          </Link>
        </Button>
      </div>
      <div className={classes.container}>
        <List className={classes.root}>
          {products.map((product, index) => (
            <ListProducts
              key={index}
              sku={product.sku}
              title={product.name}
              urlImage={product.image}
              nameProduct={product.name}
              description={product.description}
              id={product.id}
              onDelete={deleteProduct}
              price={product.price}
              oldImage={product.oldImage}
            />
          ))}
        </List>
      </div>
    </div>
  );
}

export default withRouter(Products);
