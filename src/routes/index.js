import React from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import Login from '../pages/login/containers/Login';
import Home from '../pages/home/containers/Home';
import Dashboard from '../pages/dashboard/containers/Dashboard';

const createRoutes = store => {
  return withRouter(() => {
    return (
      <Switch>
        <Route path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/dashboard' component={Dashboard} />
      </Switch>
    )
  })
}

export default createRoutes;
