import React, { useState } from "react";
import { Input, Form, Button, Layout, message, Typography, Checkbox } from 'antd';

import '../css/login.css';
import {
    UserOutlined,
    LockOutlined,
} from '@ant-design/icons';
import logo from '../img/3.png';

import { useHistory } from "react-router-dom";
import { request, setToken } from "../utils/session"

const { Header, Content } = Layout;
const { Title } = Typography;

function Login(props) {
    const history = useHistory()
    const onFinish = values => {
        request.post('/manage/login', values).then((response) => {
            setToken(response.data.token);
            history.push('Manage');
        })
            .catch(error => {
                console.log()
                message.error(error.response.data.msg);
            })
    }

    return (
        <Layout>
            <Header className="LoginHeader">
                <img src={logo} alt='' className="HeaderLogo" />
                {/* <Title level={2}>SZTU </Title> */}
            </Header>
            <Content className="BasicBody">
                <div className='LoginPad'>
                    <div className="LoginPadIllustration" />
                    <div className="LoginModule">
                        <Title
                            level={4}
                            style={{
                                marginBottom: '30px',
                                textAlign: 'center'
                            }}
                        >账号密码登录</Title>
                        <Form
                            name="LoginForm"
                            onFinish={onFinish}
                        >

                            <Form.Item
                                name="account"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入账号'
                                    }
                                ]}
                            >
                                <Input
                                    className="RadiusInput"
                                    size="large"
                                    prefix={<UserOutlined />}
                                    allowClear
                                    placeholder="请输入账号"
                                />
                            </Form.Item>

                            <Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入密码'
                                        }
                                    ]}
                                >
                                    <Input.Password
                                        className="RadiusInput"
                                        size="large"
                                        allowClear
                                        placeholder="请输入密码"
                                        prefix={<LockOutlined />}
                                    />
                                </Form.Item>
                                <div className="LoginAssist">
                                    <Checkbox className="RememberMe">记住我</Checkbox>
                                    <a href="https://www.baidu.com" className="ForgetPass">
                                        忘记密码
                                    </a>
                                </div>

                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    shape="round"
                                    size="large"
                                    style={{
                                        width: '100%',
                                    }}
                                    htmlType="submit"
                                // onClick={onFinish}
                                >登 录</Button>
                            </Form.Item>
                        </Form>

                        <a
                            href="/signup"
                            className="SignupLink"
                        >没有账号？点此注册</a>
                    </div>
                </div>
            </Content>
        </Layout>
    )
};

export default Login;