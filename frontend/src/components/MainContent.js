import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import Device from '../page/Device/Device';
import SafetyCheck from '../page/SafetyCheck/SafetyCheck';
import ResourceManage from '../page/ResourceManage';
import Material from '../page/Material';
import Login from '../page/Login';
import { createBrowserHistory } from "history";
import MainFrame from '../MainFrame';


export default class MainContent extends React.Component {
    render() {
        return (
            <Router history={createBrowserHistory()}>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path='/signup' component={null}/>
                    {/* <Route path='/Manage' component={MainFrame}> */}
                    <MainFrame>
                        
                        <Route path='/Manage/Device' component={Device} />
                        <Route path='/Manage/SafetyCheck' component={SafetyCheck} />
                        <Route path='/Manage/ResourceManage' component={ResourceManage} />
                        <Route path='/Manage/Material' component={Material} />
                    </MainFrame>
                    {/* </Route> */}
                </Switch>
            </Router>
        )
    }
}
