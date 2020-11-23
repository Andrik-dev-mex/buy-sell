import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AlertSnack from "../../AlertSnack";
import Grid from '@material-ui/core/Grid';
import { Link } from  "@material-ui/core"
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink, withRouter } from "react-router-dom";
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const MyLink = React.forwardRef((props, ref) => (
  <RouterLink ref={ref} {...props} />
));

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '40%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login(props) {
  const classes = useStyles();
  const [user, setUser] = useState({
    email:'',
    password:'' 
  });
  const [alertOptions, setAlertOptions] = useState({
    open: false,
    variant: "",
    message: "",
  })

  const handlechange = (e) => {
    setUser({
        ...user,
        [e.target.name]: e.target.value
    });
  };

  //aqui es cuando el usuario le de en ingresar nos autentique con firebase

  const handleLogin = (e) => {
    e.preventDefault();

    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(response => {
        props.history.push('/')
    })
    .catch(error => {
        console.log(error);
       // alert(error.message);
       setAlertOptions({
         open: true,
         message: "Error",
         variant:'error'
       })
    });
  };

  return (
      <div>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Ingresar a Gesty v1.0
          </Typography>
          <form className={classes.form} onSubmit={handleLogin}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              defaultValue={user.email}
              onChange={handlechange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              defaultValue={user.password}
              onChange={handlechange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Ingresar
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/signup" component={MyLink} variant="body2">
                  {"No tengo una cuenta"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
          <AlertSnack
            open ={alertOptions.open}
            message = {alertOptions.message}
            variant = {alertOptions.variant}
          />        
      </div>
    );
}

export default withRouter(Login);