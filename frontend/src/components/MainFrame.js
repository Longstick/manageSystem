import React from 'react';
import { BrowserRouter, Route, withRouter, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import '../css/Navi.css';
import Navi from './Navi';
import UserHead from './User';

import Device from '../page/Device/Device';
import SafetyCheck from '../page/SafetyCheck/SafetyCheck';
import ResourceManage from '../page/ResourceManage';
import Material from '../page/Material';


const { Content, Sider, Footer,Header } = Layout;
class MainFrame extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Layout>
                    <Sider
                        width={230}
                        //collapsible
                        style={{
                            overflow: 'auto',
                            left: 0,
                            height:'100vh',
                            position:'fixed',
                        }}
                    >
                        <Navi />
                    </Sider>

                    <Layout style={{marginLeft:230, minHeight:'100vmin'}}>
                        <Header>
                            <UserHead/>
                        </Header>
                        <Content className="content">
                            
                            {/* {this.props.children} */}
                            <Switch>
                                <Route path='/Manage/Device' component={Device} />
                                <Route path='/Manage/SafetyCheck' component={SafetyCheck} />
                                <Route path='/Manage/ResourceManage' component={ResourceManage} />
                                <Route path='/Manage/Material' component={Material} />
                            </Switch>

                        </Content>
                        <Footer style={{
                            display:'flex',
                            //textAlign: 'center',
                            margin: '0 auto',
                            //backgroundColor: '#fbfbfb'
                        }}>
                            copyright by Longstick™
                        </Footer>
                    </Layout>
                </Layout>

            </BrowserRouter>
        )
    }
}


export default withRouter(MainFrame);