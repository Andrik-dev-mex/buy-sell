import React, { Fragment } from "react";
import { withRouter, Link } from "react-router-dom";
import {
  Button,
  Dialog as CardDialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

const Dialog = ({ handleClose, open }) => {
  return (
    <Fragment>
      <CardDialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Información Importante"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            A continuación el producto que acabas de seleccionar entrara en
            proceso de negociación, tienes que ponerte de acuerdo con el
            vendedor para coordinar la compra, en caso de que no lleguen a
            ningun acuerdo solo debes cancelar el proceso. Te recomendamos que
            revises bien los productos y sobre todo sé honesto a hora de
            confirmar que el producto se te ha sido entregado.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Acepto
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Atras
          </Button>
        </DialogActions>
      </CardDialog>
    </Fragment>
  );
};

export default withRouter(Dialog);
