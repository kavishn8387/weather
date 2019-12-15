import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Login from './Components/Login';
import Dashboard from './Containers/Dashboard';

const Router = (props) => (
    <Switch>
        <Route exact path='/' component={Login}/>
        <Route path='/dashboard' component={Dashboard} />
        <Redirect from="/*" to="/" />
    </Switch>
)
export default withRouter(Router);