import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  LineChartOutlined,
  BarsOutlined,
} from '@ant-design/icons';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
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
    return (

      <Layout className="site-layout">
        <Layout style={{ minHeight: '100vh' }}>
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Router>
            <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
              <div className="logo" />
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<BarsOutlined />}>
                  <Link to="/devices">Devices</Link>
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
        </Layout>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            Bill is not a cat.
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    );
  }
}

export default MainLayout;