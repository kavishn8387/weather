import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Login from './Components/Login';
import Dashboard from './Containers/Dashboard';
import ProtectedRoute from './ProtectedRoute';

const Router = (props) => (
    <Switch>
        <Route exact path='/' component={Login}/>
        <ProtectedRoute path='/dashboard' component={Dashboard} />
        <Redirect from="/*" to="/" />
    </Switch>
)
export default withRouter(Router);