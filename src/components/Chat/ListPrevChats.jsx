import React from "react";
import {
  Grid,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@material-ui/core";

const ListPrevChats = () => {
  return (
    <Grid container>
      <Typography variant="h4" color="initial">
        Chats
      </Typography>
      <Grid item xs={12}>
        <Paper elevation={3}>
          <List>
            <ListItem button>
              <ListItemAvatar>
                <Avatar></Avatar>
              </ListItemAvatar>
              <ListItemText primary={"Vendedor: Juan Vazquez"} secondary="30/11/20 - Libro El Principito"/>
            </ListItem>
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ListPrevChats;
