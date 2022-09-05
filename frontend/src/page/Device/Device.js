import React from "react";
import {Layout,Typography} from 'antd';
import DeviceTable from '../../components/DeviceTable'

const {Header,Content}= Layout;
const {Title}=Typography

function Device(){
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
                    >设备分布情况</Title>

                {/* <Title level={4} type='secondary'>查询</Title> */}

            </Header>

            <Content style={{
                backgroundColor:'#fbfbfb',
                minHeight:"100%"
            }}>
                <DeviceTable />
                <div style={{
                    width:'auto',
                    height:'5vmin',
                }}/>
            </Content>

        </Layout>
    )
}

export default Device;