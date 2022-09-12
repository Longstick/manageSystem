import React, { useState } from "react";
import { Input, Form, Button, Layout, message, Typography } from 'antd';

import '../css/login.css';
import {
    UserOutlined,
    LockOutlined,
    MailOutlined,
    LeftOutlined
} from '@ant-design/icons';
import logo from '../img/3.png';

import { useHistory } from "react-router-dom";
import { request, setToken } from "../utils/session"

const { Header, Content } = Layout;
const { Title, Text } = Typography;


const Signup = props => {
    return (
        <Layout>
            <Header className="LoginHeader">
                <img src={logo} alt='' className="HeaderLogo" />
                {/* <Title level={2}>SZTU </Title> */}
            </Header>
            <Content className="BasicBody">
                <div className="SignupPad">
                    <div className="SignupModule">

                        <Title
                            level={4}
                            style={{
                                marginBottom: '30px',
                                textAlign: 'center'
                            }}
                        >新用户注册</Title>
                        <Form
                            name="register"
                            scrollToFirstError

                        >

                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: '请填写用户名'
                                    }
                                ]}
                                hasFeedback
                            >
                                <Input
                                    className="RadiusInput"
                                    size="large"
                                    // prefix={<LockOutlined />}
                                    placeholder="用户名"
                                />
                            </Form.Item>


                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        type: 'email',
                                        message: '请填写正确的邮箱地址'
                                    },
                                    {
                                        required: true,
                                        message: '请填写邮箱'
                                    }
                                ]}
                            >
                                <Input
                                    className="RadiusInput"
                                    size="large"
                                    // prefix={<MailOutlined />}
                                    placeholder="邮箱"
                                />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: '请填写密码'
                                    }
                                ]}
                                hasFeedback
                            >
                                <Input.Password
                                    className="RadiusInput"
                                    size="large"
                                    // prefix={<LockOutlined />}
                                    placeholder="密码"
                                />
                            </Form.Item>


                            <Form.Item>
                                <Button
                                    type="primary"
                                    shape="round"
                                    size="large"
                                    style={{
                                        width: '100%',
                                        display: 'block',
                                        margin: '0 auto',

                                    }}
                                    htmlType="submit"
                                >提交</Button>
                            </Form.Item>
                        </Form>
                        <a href="/login" className="LoginLink">已有账号，返回登录</a>
                    </div>
                    <div className="SignupIllustration" />
                </div>
            </Content>
        </Layout>
    )
}

export default Signup