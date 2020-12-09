import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/auth/Login';
import Registrer from './components/auth/Registrer';
import UserEdit from './components/user/UserEdit';
import Notifications from './components/user/Notifications';
import AddPublication from './components/publications/AddPublication';
import Chat from './components/Chat/Chat';
import BuysUser from './components/user/BuysUser';
import UpdatePassword from './components/user/UpdatePassword';
import Publications from "./components/publications/Publications";
import ListPrevChats from './components/Chat/ListPrevChats';

export default function Routes() {
  return(
    <Switch>
      <Route exact path = "/" component={Home}/>
      <Route exact path = "/login" component={Login}/>
      <Route exact path = "/registrer" component={Registrer}/>
      <Route exact path = "/user/edit/" component={UserEdit}/>
      <Route exact path = "/user/notifications/" component={Notifications}/>
      <Route exact path = "/user/addproduct/" component={AddPublication}/>
      <Route exact path = "/user/yourbuys/" component ={BuysUser}/>
      <Route exact path = "/user/chat/" component={Chat}/>
      <Route exact path = "/user/updatepassword/" component={UpdatePassword}/>
      <Route exact path = "/user/publications/" component = {Publications}/>
      <Route exact path = "/user/chats/" component={ListPrevChats}/>
    </Switch>
  )
}