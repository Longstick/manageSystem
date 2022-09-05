import React from "react";
import {Layout, Typography, Divider} from 'antd';
import Lending from '../components/ResourceManage/Lending'
import Storage from '../components/ResourceManage/Storage'

const {Header,Content}= Layout;
const {Title}=Typography

function ResourceManage(){
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
                    >流动资源管理</Title>
            </Header>

            <Content style={{
                backgroundColor:'#fbfbfb',
                minHeight:"100%"
            }}>
                <Title level={4} type='secondary' style={{height:'5vmin'}}>图书借还</Title>
                <Lending/>
                <Divider/>

                <Title level={4} type='secondary' style={{height:'5vmin'}}>图书库存</Title>
                <Storage/>

            </Content>

        </Layout>
    )
}

export default ResourceManage;