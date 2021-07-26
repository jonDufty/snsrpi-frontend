import React from 'react';
import { Menu, Button } from 'antd';
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
  } from '@ant-design/icons';

class SideMenu extends React.Component {
    state = {
        collapsed: false,
    };

    togglerCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <div style = {{ width: 200 }}>
                <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                    {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                </Button>
                <Menu>
                    <Menu.Item key="1" >
                        Devices
                    </Menu.Item>
                    <Menu.Item key="2" >
                        Config
                    </Menu.Item>
                    <Menu.Item key="3" >
                        Monitor
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}

export default SideMenu;