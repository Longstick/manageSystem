import React from "react";
import {Layout, Typography, Divider} from 'antd';
import Distribute from '../components/Material/Distribute'
import Staff from '../components/Material/staff'

const {Header,Content}= Layout;
const {Title}=Typography

function Material(){
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
                    >耗材管理</Title>
            </Header>

            <Content style={{
                backgroundColor:'#fbfbfb',
                minHeight:"100%"
            }}>
                <Title level={4} type='secondary' style={{height:'5vmin'}}>耗材消耗情况</Title>
                <Distribute/>
                <Divider/>

                <Title level={4} type='secondary' style={{height:'5vmin'}}>耗材库存</Title>
                <Staff/>

            </Content>

        </Layout>
    )
}

export default Material;