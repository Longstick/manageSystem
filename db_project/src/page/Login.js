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
            <div className='BasicBody'>
                <div className='LoginPad'>

                    {/* <Title
                        level={3}
                        style={{
                            marginBottom: '30px'
                        }}
                    >登录</Title> */}
                    <img src={logo} alt='' />

                    <Form
                        ref={this.formref}
                    >

                        <Form.Item
                            name="account"
                        >
                            <Input
                                size="large"
                                prefix={<UserOutlined />}
                            />
                        </Form.Item>


                        <Form.Item
                            name="password"
                        >
                            <Input
                                size="large"
                                type="password"
                                allowClear
                                prefix={<LockOutlined />}
                            />
                        </Form.Item>
                    </Form>

                    <Button
                        type="primary"
                        shape="round"
                        size="large"
                        style={{
                            width: '100%',
                            marginBottom:'30px'
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

                    >点击登录</Button>

                    <Button 
                        type="link"
                        style={{
                            width: '100%',
                        }}

                    >没有账号？点此注册</Button>


                </div>
            </div>
        )
    }
};