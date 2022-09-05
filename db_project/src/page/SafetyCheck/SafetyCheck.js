import React from "react";
import {Layout, Typography, Divider} from 'antd';

import SafetyTable from "../../components/SafetyCheck/SafetyTable";
import SafetyChecking from "../../components/SafetyCheck/SafetyChecking";

const {Header,Content}= Layout;
const {Title}=Typography

function SafetyCheck(){
    return(
        <Layout>
            <Header style={{
                padding: 0,
                backgroundColor:'#fbfbfb',
                height:'auto',
            }}>
                <Title 
                    level={2} 
                    style={{
                        height:'8vmin',
                    }}
                    >安全性检查</Title>
            </Header>

            <Content style={{
                backgroundColor:'#fbfbfb',
                minHeight:"100%"
            }}>
                <Title level={4} type='secondary' style={{height:'5vmin'}}>安全检查台账</Title>
                <SafetyTable />
                {/* <div style={{
                    width:'auto',
                    height:'5vmin',
                }}/> */}

                <Divider/>

                <Title level={4} type='secondary' style={{height:'5vmin'}}>安全风险分析</Title>
                <SafetyChecking />

            </Content>

        </Layout>
    )
}

export default SafetyCheck;