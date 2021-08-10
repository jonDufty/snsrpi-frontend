import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import AppHeader from './Header';

import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import DeviceMenu from './DeviceMenu';
import MainMenu from './MainMenu';
import devices from '../resources/device_list';
import MenuRouter from '../Router';
import Config from './Config';
import Monitor from './Monitor';


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
        <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <MainMenu onCollapse={this.onCollapse} collapsed={collapsed}></MainMenu>
          <Layout>
            <Sider theme="light">
              <DeviceMenu devices={device_list} />
            </Sider>
            <Content style={{ padding: '50px 50px' }}>
                <Switch>
                  <Route path='/config' component={Config} />
                  <Route path='/monitor' component={Monitor} />
                </Switch>
            </Content >
          </Layout>
        </Layout>
        </Router>
        <Footer style={{ minHeight: '100vh', textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    );
  }
}

export default MainLayout;