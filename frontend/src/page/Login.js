import React from "react";
import { Input, Form, Button, Layout, message, Typography} from 'antd';

import '../css/login.css';

import logo from '../img/3.png';
import LoginPad from "../components/Login/LoginPad";

const { Header, Content } = Layout;
const { Title} = Typography;

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_signup: false,
        }
    }

    render() {
        return (
            <Layout>
                <Header className="LoginHeader">
                    <img src={logo} alt='' className="HeaderLogo" />
                    {/* <Title level={2}>SZTU </Title> */}
                </Header>
                <Content>
                    <LoginPad/>
                </Content>
            </Layout>
        )
    }
};