import { Space, Typography, Avatar, Popover, Button, message} from 'antd';
import avatar from '../img/avatar.jpg'
const {Text, Title}= Typography;

function UserHead(props){
    
    const logout = ()=>{
        message.success('退出成功！')
        window.sessionStorage.removeItem('usertoken');
        // setTimeout(() => history.push('/'), 1500)
        setTimeout(() => window.location.reload(true), 1500)
        // setTimeout(()=> navigator(''), 1500);
    }

    const content=(
        <div style={{
            width:'100%',
        }}>
            <Space direction="vertical">
                <Button type='text' size='large'>个人中心</Button>
                <Button type='text' size='large' onClick={logout}>
                    退出登录
                </Button>
            </Space>
    
    
        </div>
    )

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