import React from "react";
import { Input, Form, Button, message } from 'antd';

import '../../css/login.css';
import {
    UserOutlined,
    LockOutlined,
} from '@ant-design/icons';

import { useHistory } from "react-router-dom";
import { request, setToken } from "../../utils/session"


function LoginPad(props) {
    const formref = React.useRef();
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
        

        // formref.current.validateFields().then(() => {
        //     request.post('/manage/login', formref.current.getFieldsValue()).then(response => {
        //         window.sessionStorage.setItem('usertoken', response.data.token);
        //         history.push('/Manage/Device');
        //     })
        //         .catch(error => {
        //             message.error('账号或密码不存在!');
        //         })
        // })

    }

    return (
        <div className='BasicBody'>
            <div className='LoginPad'>
                <div className="LoginPadIllustration" />
                <div className="LoginModule">
                    <Form
                        name="LoginForm"
                        ref={formref}
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
                                style={{
                                    'borderRadius': '20px',
                                }}
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
                                        message: '请输入账号'
                                    }
                                ]}
                            >
                                <Input
                                    style={{
                                        borderRadius: '20px',
                                        // marginBottom: '-10px',
                                    }}
                                    size="large"
                                    type="password"
                                    allowClear
                                    placeholder="请输入密码"
                                    prefix={<LockOutlined />}
                                />
                            </Form.Item>
                            <a href="https://www.baidu.com" className="ForgetPass">
                                忘记密码
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                shape="round"
                                size="large"
                                style={{
                                    width: '100%',
                                    // marginTop: '20px',
                                    // marginBottom: '10px'
                                }}
                                htmlType="submit"
                                // onClick={onFinish}
                            >登 录</Button>
                        </Form.Item>
                    </Form>

                    <Button
                        type="link"
                        style={{
                            display: 'block',
                            margin: '0 auto'
                            // width: '100%',
                        }}
                        onClick={() => {
                            history.push('/signup');
                            console.log('signup');
                        }}
                    >没有账号？点此注册</Button>
                </div>

            </div>
        </div>
    )
}

export default LoginPad