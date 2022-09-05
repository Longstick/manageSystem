import React,{ useState } from 'react';
import { Space, Typography, Avatar, Popover, Button} from 'antd';
import avatar from '../img/avatar.jpg'
const {Text, Title}= Typography;

const content=(
    <div style={{
        width:'100%',
    }}>
        <Space direction="vertical">
            <Button type='text' size='large'>个人中心</Button>
            <Button type='text' size='large'>
                退出登录
            </Button>
        </Space>


    </div>
)

const UserHead=()=>{
    return (
        <div style={{

            width:'30%',
            float: 'right',
            color:'white',
            height:'100%'
        }}>
            <Popover content={content}>
                <Space style={{float: 'right'}}>
                    <Text strong style={{color:'white'}}>Longstick</Text>
                    <Avatar src={avatar} />
                </Space>
            </Popover>
        </div>
    )
};

export default UserHead;