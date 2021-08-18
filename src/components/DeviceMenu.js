import React, { useState, useEffect } from 'react';
import { Layout, Menu, Spin, Empty } from 'antd';
// import devices from '../resources/device_list';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;
const base_url = process.env.REACT_APP_BACKEND_API_URL;

const DeviceMenu = (props) => {

  const [loading, setLoading] = useState(true);
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState([]);
  const [defaults, setDefaults] = useState();
  
  const url = base_url + '/api/devices';

  function fetchDevices() {
    fetch(url)
      .then(resp => (resp.json()))
      .then(res => {
        setDevices(res);
        setLoading(false);
        console.log(`devices updated to ${devices.length} devices`);
        console.log(res);
      })
      .catch(e => (console.log(e)));
  }

  useEffect(() => {
    if (devices.length == 0) {
      fetchDevices();
    };

  }, [devices])

  const handleMenuClick = (e) => {
    setSelectedDevice(e.key);
    console.log(`set selected device to ${e.key}`);
    props.handleClick(e);
  };

  if (loading) {
    return (
      <Spin tip="Loading..." />
    );
  } else if (devices.length == 0) {
    return (
      <Empty description="No devices found" />
    );
  } else {
    return (
      <Sider>
        <Menu mode='inline' onClick={handleMenuClick}
          selectedKeys={[selectedDevice]}
        >
          {
            devices.map((item) => {
              return (
                <SubMenu key={item.name} title={item.name}>
                  {item.devices.map((device, key) => (
                    <Menu.Item key={item.name + "/" + device.name}>{device.name}</Menu.Item>
                  ))}
                </SubMenu>
              );
            })
          }
        </Menu>
      </Sider>
    );
  }
}

export default DeviceMenu
