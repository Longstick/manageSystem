import React from "react";
import { Input, Form, Button, Typography, Space, Layout, message } from 'antd';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import '../css/login.css';
import {
    UserOutlined,
    LockOutlined
} from '@ant-design/icons';

import { request } from '../router/http.js'
import MainContent from "../components/MainContent";
import logo from '../img/3.png';

const { Title } = Typography;
const { Header, Content, Footer } = Layout;


export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    formref = React.createRef();

    render() {
        return (
            <Layout>
                <Header className="LoginHeader">
                    <img src={logo} alt='' className="HeaderLogo" />
                </Header>
                <Content>
                    <div className='BasicBody'>
                        <div className='LoginPad'>

                            {/* <Title
                            level={3}
                            style={{
                                marginBottom: '30px'
                            }}
                        >登录</Title> */}
                            <div className="LoginPadIllustration" />

                            <div className="LoginModule">
                                <Form
                                    ref={this.formref}
                                >

                                    <Form.Item
                                        name="account"
                                    >
                                        <Input
                                            style={{
                                                'borderRadius': '20px',
                                            }}
                                            size="large"
                                            prefix={<UserOutlined />}
                                            allowClear
                                            placeholder="请输入账号"
                                        />
                                    </Form.Item>


                                    <Form.Item
                                        name="password"
                                    >
                                        <Input
                                            style={{
                                                borderRadius: '20px',
                                                marginBottom: '10px',
                                            }}
                                            size="large"
                                            type="password"
                                            allowClear
                                            placeholder="请输入密码"
                                            prefix={<LockOutlined />}
                                        />
                                        {/* <Button
                                            type="link"
                                            size='small'
                                            style={{
                                                float: 'right'
                                            }}
                                            onClick={()=>{
                                                this.props.history.push('/signup');
                                                console.log('signup');
                                            }}

                                        >忘记密码？</Button> */}
                                    </Form.Item>


                                </Form>


                                <Button
                                    type="primary"
                                    shape="round"
                                    size="large"
                                    style={{
                                        width: '100%',
                                        // marginTop: '20px',
                                        marginBottom: '10px'
                                    }}
                                    onClick={event => {
                                        this.formref.current.validateFields().then(() => {
                                            request.post('/manage/login', this.formref.current.getFieldsValue()).then(response => {
                                                window.sessionStorage.setItem('usertoken', response.data.token);
                                                this.props.history.push('/Manage/Device');
                                            })
                                                .catch(error => {
                                                    message.error('账号或密码不存在!');
                                                })
                                        })

                                    }}

                                >登 录</Button>

                                <Button
                                    type="link"
                                    style={{
                                        display: 'block',
                                        margin: '0 auto'
                                        // width: '100%',
                                    }}
                                >没有账号？点此注册</Button>
                            </div>

                        </div>
                    </div>
                </Content>
            </Layout>
        )
    }
};