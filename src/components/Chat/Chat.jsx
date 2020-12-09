import React, {useState, useEffect, useRef} from 'react';
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import firebase from "../../config/firebase";
import NewMessage from './NewMessage';
import CustomAvatar from '../user/CustomAvatar';
import {loadUser} from '../../utils/dbUtils';

const useStyles = makeStyles((theme) => ({
    text: {
      padding: theme.spacing(2, 2, 0),
    },
    paper: {
      paddingTop: 15,
      paddingBottom: 50,
      height: '70vh'
    },
    list: {
      marginBottom: theme.spacing(3),
      maxHeight: '100%',
      overflow: 'auto'
    },
}));

const Chat = ({history}) => {
    const classes = useStyles();
    const [messages, setMessages] = useState([]);

    const chatDomRef = useRef();

    const addMessage = (message) => {
        messages.push(message);
        //aqui se clona y ahora lo vamos a arreglar para que se pueda ver los mensajes por fecha
        setMessages([...messages.sort((a, b) => a.date - b.date)]);
        //aqui es para el scroll para que automaticamente baje hasta abajo :D

        if(chatDomRef.current) {
            chatDomRef.current.scrollTop = chatDomRef.current.scrollHeight
        }
    };

    //aqui es para que se aguarde los mensajes
    useEffect(() => {
        const chatRef = firebase.database().ref('/chat');
        //con esta funcion, cuando se agregue un nuevo elemento a la coleccion, se dispare una funcion que va a leer 
        //el nuevo mensaje y lo va agregar al chat, esto es similiar al chat de whatssap que aparecen instantaneamente
        chatRef.on(
            'child_added',
            snapshot => {
                //Nuevo mensaje
                const messageItem = snapshot.val();
                // leer los datos del usuario
                loadUser(messageItem.user)
                .then(data => { 
                  messageItem.user = data;
                  addMessage(messageItem);
                 });
            },
            error => {
                // aqui se me muestra el error
                console.log(error);
                //aqui es para redireccionar a login
                if(error.message.includes('permission_denied')) {
                    history.push('/login');
                }
            }
        )
    }, []);

    return(
        <Container>
        <Paper square className={classes.paper}>
        <Typography className={classes.text} variant="h5" gutterBottom>
          Chat
        </Typography>
        <List className={classes.list} ref={chatDomRef} >
          {messages.map(({ date, user, message }) => (
              <ListItem button key={date}>
                <ListItemAvatar>
                    <CustomAvatar name={user.name} avatar={user.avatar} size="md" />
                </ListItemAvatar>
                <ListItemText primary={user ? user.name: 'anonymous'} secondary={message} />
              </ListItem>
          ))}
        </List>
      </Paper>
        <NewMessage />
      </Container>
    );
};

export default withRouter(Chat);