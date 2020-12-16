import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../containers/Login';
import Signup from '../containers/Signup';
import Dashboard from '../containers/Dashboard';
import PageNotFound from '../containers/PageNotFound';
import BlockedUser from '../containers/BlockedUser';
import PrivateRoutes  from './privateRoutes.js';

const Routes=() =>{
  return (
    <BrowserRouter>
    <Switch>
    <Route exact path='/' component={Login}/>
    {/* <Route exact path='/' component={Login}/> */}
    <Route exact path='/login' component={Login}/>
    <Route exact path='/blockeduser' component={BlockedUser} />
    <Route exact path='/signup' component={Signup}/>
    <PrivateRoutes exact path='/dashboard' component={Dashboard} />
    <Route path="*" component={PageNotFound} />
    </Switch>
    </BrowserRouter>
  );
}

export default Routes;
