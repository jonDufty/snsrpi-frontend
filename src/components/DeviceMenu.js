import React from 'react';
import { Layout, Menu } from 'antd';
import devices from '../resources/device_list';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

const DeviceMenu = ({ devices }) => {

  return (
    <Sider>
      <Menu mode='inline'>
        {devices.map((item) => {
          return (
            <SubMenu key={item.name} title={item.name}>
              {item.devices.map((device, key) => (
                <Menu.Item key={device.name}>{device.name}</Menu.Item>
              ))}
            </SubMenu>
          );
        })}
      </Menu>
    </Sider>
  );
}

export default DeviceMenu
