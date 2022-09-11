import React from 'react';
import { Route, Switch, BrowserRouter, Router, Redirect } from 'react-router-dom';

import Login from '../page/Login';
import Signup from '../page/Signup';
import { createBrowserHistory } from "history";
import MainFrame from './MainFrame';
import PrivateRouter from './PrivateRouter';

class MainContent extends React.Component {
    render() {
        return (
            <Router history={createBrowserHistory()}>
                <Switch>
                    <Route exact path="/Login" component={Login} />
                    <Route path='/Signup' component={Signup} />
                    <PrivateRouter path='/Manage' component={MainFrame} />
                    <Redirect to='/Login'></Redirect>
                </Switch>
            </Router>
        )
    }
}

export default MainContent;