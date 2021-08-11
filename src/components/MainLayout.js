import React, { useState, useEffect} from 'react';
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


const MainLayout = () => {
  
  const [collapsed, setCollapsed] = useState(false)
  const [device, setDevice] = useState({device:null, sensor:null});
  var defaultSelect = {
    menu: null,
    sub: null
  };


  const onCollapse = collapsed => {
    console.log(collapsed);
    setCollapsed(() => (collapsed));
  };

  const HandleDeviceClick = (e) => {
    console.log(e.key);
    const [dev, log] = e.key.split("/");
    const new_device = {device: dev, sensor: log}
    setDevice(() => (new_device));
    defaultSelect.menu = device;
    defaultSelect.sub = e.key;
  }


  return(
    
      <Layout className="site-layout">
        <AppHeader />
        <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <MainMenu onCollapse={onCollapse} collapsed={collapsed}></MainMenu>
          <Layout>
            <Sider theme="light">
              <DeviceMenu handleClick={HandleDeviceClick} />
            </Sider>
            <Content style={{ padding: '50px 50px' }}>
                <Switch>
                  <Route path='/config'>
                    <Config device={device}/>
                  </Route>
                  <Route path='/monitor'>
                    <Monitor />
                  </Route>
                  <Route path='/settings'>
                    <Monitor />
                  </Route >
                </Switch>
            </Content >
          </Layout>
        </Layout>
        </Router>
        <Footer style={{ minHeight: '100vh', textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
  );
}

export default MainLayout;