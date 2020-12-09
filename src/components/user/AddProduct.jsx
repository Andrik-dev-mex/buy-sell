import React, { Fragment, useState, useEffect } from "react";
import firebase from "../../config/firebase";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Stepper, Step, StepLabel } from "@material-ui/core";
import { StepOne, StepTwo, StepTree } from "../../components/user/Steps";
import AlertSnack from "../../AlertSnack";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    root: {
      width: "100%",
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
}));

function getSteps() {
  return ["Datos de Tu producto", "Vista Previa", "Guarda tu producto"];
}

const AddProduct = (props) => {
  const classes = useStyles();

  const { currentUser } = firebase.auth();

  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    state: "",
    price: "",
    image: "",
    category: "",
    descriptionExtended: "",
    typeOfBuy: "",
    propietary: {
      name: "",
      userID: "",
    },
  });

  const [alertOptions, setAlertOptions] = useState({
    open: false,
    variant: "",
    message: "",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOptions({
      ...alertOptions,
      open: false,
    });
  };

  const [activeStep, setActiveStep] = React.useState(0);

  const [image, setImage] = useState(null);

  const steps = getSteps();

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeImage = (e) => {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    setImage({
      type: file.type.split("/")[1],
      file,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveProduct();
  };

  const saveProduct = () => {
    const randomId = Math.random().toString(36).substring(2);
    if (image) {
      product.image = `${randomId}.${image.type}`;
      firebase
        .storage()
        .ref(`/images/${product.image}`)
        .put(image.file)
        .then((snapshot) => {
          firebase
            .storage()
            .ref()
            .child(`/images/${product.image}`)
            .getDownloadURL()
            .then((url) => {
              setProduct({ ...product, image: url });
            });
        });
    }

    firebase
      .database()
      .ref("/publications")
      .push({
        ...product,
        propietary: {
          name: currentUser.displayName.split(" ")[0],
          userID: currentUser.uid,
        },
      })
      .then(() => {
        setAlertOptions({
          ...alertOptions,
          open: true,
          message: "Publicacion Guardada",
          variant: "success",
        });
        setTimeout(() => {
          props.history.push("/user/publications");
        }, 1500);
      })
      .catch((error) => {
        setAlertOptions({
          ...alertOptions,
          open: true,
          message: "Error al guargar la publicación",
          variant : "error"
        });
        setTimeout(() => {
          props.history.push("/user/publications");
        }, 1500);
      });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <StepOne
            product={product}
            handleChange={handleChange}
            handleImage={handleChangeImage}
          />
        );
      case 1:
        return <StepTwo image={image} product={product} />;
      case 2:
        return <StepTree click={handleSubmit} />;
      default:
        return "Unknown step";
    }
  }

  const validateForm = () => {
    const {
      name,
      brand,
      description,
      state,
      price,
      category,
      descriptionExtended,
      typeOfBuy,
    } = product;
    return !(
      name &&
      brand &&
      description &&
      state &&
      price > 0 &&
      category &&
      descriptionExtended &&
      image &&
      typeOfBuy
    );
  };

  useEffect(() => {
    if (currentUser) {
    } else {
      props.history.push("/login");
    }
  }, [currentUser, props.history]);

  return (
    <Fragment>
      <div className={classes.root.root}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {activeStep >= 0 && (
            <div>
              {getStepContent(activeStep)}
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                >
                  Atras
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                  disabled={validateForm()}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Siguiente"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <AlertSnack
        open={alertOptions.open}
        message={alertOptions.message}
        variant={alertOptions.variant}
        handleClose={handleClose}
      />
    </Fragment>
  );
};

export default AddProduct;
