import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/';
import Login from './components/auth/Login';
import Registrer from './components/auth/Registrer';
import Product from './components/products/Product';
import UserEdit from './components/user/UserEdit';
import Notifications from './components/user/Notifications';
import AddProduct from './components/products/AddProduct';
import Chat from './components/user/Chat';

export default function Routes(){
  return(
    <Switch>
      <Route exact path = "/" component={Home}/>
      <Route exact path = "/login" component={Login}/>
      <Route exact path = "/registrer" component={Registrer}/>
      <Route exact path = "/product/:id" component={Product}/>
      <Route exact path = "/user/edit/:id" component={UserEdit}/>
      <Route exact path = "/user/notifications/:id/" component={Notifications}/>
      <Route exact path = "/user/addproduct/:id" component={AddProduct}/>
      <Route exact path = "/user/chat/:id" component={Chat}/>
    </Switch>
  )
}