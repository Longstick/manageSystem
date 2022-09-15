import React, { useState } from "react";
import { Input, Form, Button, Layout, message, Typography, Radio } from 'antd';

import '../css/login.css';
import {
    UserOutlined,
    LockOutlined,
    MailOutlined,
    LeftOutlined
} from '@ant-design/icons';
import logo from '../img/3.png';


const { Header, Content } = Layout;
const { Title } = Typography;

const Signup = props => {
    const [identity, setid] = useState('inSchool');
    const onChange = ({ target: { value } }) => {
        console.log(value)
        setid(value);
    }
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
                                marginBottom: '20px',
                                textAlign: 'center'
                            }}
                        >新用户注册</Title>
                        <Radio.Group
                            onChange={onChange}
                            buttonStyle="solid"
                            className="idRadio"
                            defaultValue='inSchool'
                        >
                            <Radio.Button
                                value="inSchool"
                                style={{
                                    borderTopLeftRadius: '20px',
                                    borderBottomLeftRadius: '20px',
                                    // margin: '10px',
                                }}
                            >学生/教职工</Radio.Button>
                            <Radio.Button
                                value="outSchool"
                                style={{
                                    borderTopRightRadius: '20px',
                                    borderBottomRightRadius: '20px'
                                    // borderRadius: '20px',
                                    // margin: '10px',
                                }}
                            >合作/供应商</Radio.Button>
                        </Radio.Group>


                        { identity === 'inSchool' ?
                            <Form
                                name="inSchoolRegister"
                                scrollToFirstError
                            >
                                <Form.Item
                                    name="realname"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请填写姓名'
                                        }
                                    ]}
                                    hasFeedback
                                >
                                    <Input
                                        className="RadiusInput"
                                        size="large"
                                        // prefix={<LockOutlined />}
                                        placeholder="真实姓名"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="email"
                                    rules={[
                                        {
                                            type: 'email',
                                            message: '请填写正确的内部邮箱地址'
                                        },
                                        {
                                            required: true,
                                            message: '请填写内部邮箱'
                                        }
                                    ]}
                                    hasFeedback
                                >
                                    <Input
                                        className="RadiusInput"
                                        size="large"
                                        // prefix={<MailOutlined />}
                                        placeholder="内部邮箱"
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
                            
                            
                            :

                            
                            <Form
                            name="OutSchoolRegister"
                            scrollToFirstError
                        >
                            <Form.Item
                                name="account"
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
                                hasFeedback
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
                            
                            
                            }

                        <a href="/login" className="LoginLink">已有账号，返回登录</a>
                    </div>
                    <div className="SignupIllustration" />
                </div>
            </Content>
        </Layout>
    )
}

export default Signup