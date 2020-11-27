import React, { Fragment, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
} from "@material-ui/core";
import { StepOne, StepTwo, StepTree } from "../../components/user/Steps";

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
  return [
    "Datos de Tu producto",
    "Acepta nuestros terminos y condiciones",
    "Guarda tu producto",
  ];
}

const AddProduct = () => {
  const classes = useStyles();
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    state: "",
    price : "",
    image: "",
    category: "",
    descriptionExtended: "",
    userID: "",
  });
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <StepOne product={product} handleChange={handleChange}/>;
      case 1:
        return <StepTwo />;
      case 2:
        return <StepTree />;
      default:
        return "Unknown step";
    }
  }

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
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={handleReset} className={classes.button}>
                Reset
              </Button>
            </div>
          ) : (
            <div>
              {getStepContent(activeStep)}
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                >
                  Back
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default AddProduct;
