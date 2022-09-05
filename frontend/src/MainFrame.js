import React from 'react';
import { BrowserRouter,withRouter} from 'react-router-dom';
import { Layout } from 'antd';
import './css/Navi.css';
import Navi from './components/Navi';
import MainContent from './components/MainContent';
import UserHead from './components/User';



// const {SubMenu}= Menu;
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
                            {this.props.children}
                            {/* <MainContent/> */}
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