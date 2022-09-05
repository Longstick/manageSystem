import React from 'react';
import { Link } from 'react-router-dom';

import { Menu } from 'antd';
import {
    HddFilled,
    ProfileFilled,
    DashboardFilled,
    BookFilled,
    ExperimentFilled,
} from '@ant-design/icons';
import '../css/Navi.css';
import imgURL from '../img/2.png';

//const menus=global.menus;
const { SubMenu } = Menu;

// const menus = [
//     {
//         title: '设备',
//         icon: '',
//         key: '/page/Device'
//     },   {
//         title: '资源',
//         icon: '',
//         key: '/page/ResourceManage',
//      },
// ]

class Navi extends React.Component {
    // renderSubMenu =({key,title,icon,subs})=>{
    //     return(
    //         <Menu.SubMenu key={key} title={title}>
    //             {
    //                 subs && subs.map(item => {
    //                     return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
    //                 })
    //             }
    //         </Menu.SubMenu>
    //     )
    // }

    // renderMenuItem =({key,title,icon})=> {
    //     return(
    //         <Menu.Item key={key} title={title} icon={icon}>
    //             <Link to={key} />
    //         </Menu.Item>
    //     )
    // }

    render() {
        return (
            <div>
                <div className="Logo">
                    <img src={imgURL} alt='1' />
                </div>
                <Menu
                    mode="inline"
                    theme="dark"
                    style={{
                        //display:'inline',
                        height: '100%',
                        borderRight: '0',
                        //width:'40vmin',

                    }}
                >
                    <SubMenu key="sub1" title="仪器设备管理" icon={<HddFilled />}>
                        <Menu.Item key='Device' icon={<ProfileFilled />}>
                            <Link to={"/Manage/Device"} />
                            设备分布情况</Menu.Item>

                        <Menu.Item key='SafetyCheck' icon={<DashboardFilled />}><Link to={"/Manage/SafetyCheck"} />安全性检查</Menu.Item>
                    </SubMenu>

                    <Menu.Item key="ResourceManage" icon={<BookFilled />}>
                        <Link to={"/Manage/ResourceManage"} />流动资源管理
                    </Menu.Item>

                    <Menu.Item key='Material' icon={<ExperimentFilled />}>
                        <Link to={'/Manage/Material'} />消耗状况
                    </Menu.Item>

                    {/* {
                    menus.map(item => {
                        return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
                    })
                } */}

                </Menu>
            </div>
        )
    }
}


export default Navi;