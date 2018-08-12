import React from 'react';
import {Route, withRouter, Switch} from 'react-router-dom';
import Home from '../pages/home/containers/Home';
import Register from '../pages/register/containers/Register';
import Login from '../pages/login/containers/Login';
import Dashboard from '../pages/dashboard/containers/Dashboard';

const createRoutes = store => {
  return withRouter(() => {
    return (
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route component={Home} />
      </Switch>
    );
  });
};

export default createRoutes;
