import React from 'react';
import { Route, Switch, BrowserRouter, Router } from 'react-router-dom';

import Login from '../page/Login';
import { createBrowserHistory } from "history";
import MainFrame from './MainFrame';
import PrivateRouter from './PrivateRouter';

class MainContent extends React.Component {
    render() {
        return (
            <Router history={createBrowserHistory()}>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path='/Signup' component={null} />
                    <PrivateRouter path='/Manage' component={MainFrame} />
                    
                </Switch>
            </Router>
        )
    }
}

export default MainContent;