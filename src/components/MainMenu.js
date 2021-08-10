import React, { useState, useEffect} from 'react';
import { Layout, Menu } from 'antd';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import {
    DesktopOutlined,
    LineChartOutlined,
    BarsOutlined,
  } from '@ant-design/icons';
import Config from './Config';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

const MainMenu = (props) => {

    const [selected, setSelected] = useState('settings')

    return (
        <Sider collapsible collapsed={props.collapsed} onCollapse={props.onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" selectedKeys={selected}>
                <Menu.Item key="settings" icon={<BarsOutlined />} onClick={()=>setSelected('settings')}>
                    <Link to="/settings">Heidi</Link>
                </Menu.Item>
                <Menu.Item key="config" icon={<DesktopOutlined />} onClick={()=>setSelected('config')}>
                    <Link to="/config">Config</Link>
                </Menu.Item>
                <Menu.Item key="monitor" icon={<LineChartOutlined />} onClick={()=>setSelected('monitor')}>
                    <Link to="/monitor">Monitor</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
}

export default MainMenu



