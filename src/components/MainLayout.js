import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import AppHeader from './Header';
import {
  DesktopOutlined,
  LineChartOutlined,
  BarsOutlined,
} from '@ant-design/icons';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import DeviceMenu from './DeviceMenu';
import devices from '../resources/device_list';


const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


class MainLayout extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    const device_list = devices;
    return (

      <Layout className="site-layout">
        <AppHeader />
        <Layout style={{ minHeight: '100vh' }}>
          <Router>
            <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
              <div className="logo" />
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<BarsOutlined />}>
                  <Link to="/settings">Settings</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined />}>
                  <Link to="/config">Configuration</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<LineChartOutlined />}>
                  <Link to="/monitor">Monitor</Link>
                </Menu.Item>
              </Menu>
            </Sider>
          </Router>
          <Sider theme="light">
            <DeviceMenu devices={device_list} />
          </Sider>
        </Layout>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    );
  }
}

export default MainLayout;