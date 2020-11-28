import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/auth/Login';
import Registrer from './components/auth/Registrer';
import Product from './components/products/Product';
import UserEdit from './components/user/UserEdit';
import Notifications from './components/user/Notifications';
import AddProduct from './components/user/AddProduct';
import Chat from './components/user/Chat/Chat';
import BuysUser from './components/user/BuysUser';
import UpdatePassword from './components/user/UpdatePassword';
import Publications from "./components/user/Publications";

export default function Routes(){
  return(
    <Switch>
      <Route exact path = "/" component={Home}/>
      <Route exact path = "/login" component={Login}/>
      <Route exact path = "/registrer" component={Registrer}/>
      <Route exact path = "/product/" component={Product}/>
      <Route exact path = "/user/edit/" component={UserEdit}/>
      <Route exact path = "/user/notifications/" component={Notifications}/>
      <Route exact path = "/user/addproduct/" component={AddProduct}/>
      <Route exact path = "/user/yourbuys/" component ={BuysUser}/>
      <Route exact path = "/user/chat/" component={Chat}/>
      <Route exact path = "/user/updatepassword/" component={UpdatePassword}/>
      <Route exact path = "/user/publications/" component = {Publications}/>
    </Switch>
  )
}