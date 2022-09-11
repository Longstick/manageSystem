import React, { useState } from "react";
import { Input, Form, Button, Layout, message, Typography } from 'antd';

import '../css/login.css';
import {
    UserOutlined,
    LockOutlined,
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
                    <Form
                        name="register"
                        scrollToFirstError

                    >
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
                            <Input
                                type="password"
                                className="RadiusInput"
                                size="large"
                            />
                        </Form.Item>
                        <Button
                            htmlType="submit"
                            shape="round"
                        >提交</Button>
                        
                    </Form>
                </div>

            </Content>
        </Layout>
    )
}

export default Signup