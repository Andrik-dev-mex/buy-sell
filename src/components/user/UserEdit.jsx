import React, {useEffect, useState} from 'react';
import firebase from '../../config/firebase';
import { loadUser } from '../../utils/dbUtils';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex'
  }
}));


const UserEdit = (props) => {
  const classes = useStyles();

  const [user, setUser] = useState({})

  const addUser = (newUser) => {
    user.push(newUser);

    setUser({...user, newUser})
  };

  useEffect(() => {
    const usersRef = firebase.database().ref(`/users/${id}`);

    usersRef.on(
      "child_added",
      (snapshot) => {
        loadUser(snapshot.key)
        .then(data => {
          addUser(data);
        })
      },
      (error) => {
        console.log(error);
        if (error.message.includes("permission_denied")) {
          props.history.push("/login");
        }
      }
    );
  });

  console.log(user);
  const {id} = props.match.params;
  console.log(id);
  return(
    <div className={classes.container}>

    </div>
  )
};

export default UserEdit;