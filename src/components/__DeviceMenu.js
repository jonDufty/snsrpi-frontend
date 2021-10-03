import React, { useState, useEffect } from 'react';
import { Layout, Menu, Spin, Empty } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDevices, devicesSelector, selectDevice } from '../slices/devices';
// import devices from '../resources/device_list';

import { DeviceMenuItem } from './menus/DeviceMenuItem';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;
const base_url = process.env.REACT_APP_BACKEND_URL;

const DeviceMenu = (props) => {

  // const [loading, setLoading] = useState(true);
  // const [devices, setDevices] = useState([]);
  // const [selectedDevice, setSelectedDevice] = useState([]);
  // const [defaults, setDefaults] = useState();

  const dispatch = useDispatch()
  const { devices, loading, hasErrors, selected } = useSelector(devicesSelector)

  const url = base_url + '/api/devices';

  useEffect(() => {
    dispatch(fetchDevices())
    console.log(devices);
  }, [dispatch])


  const handleMenuClick = (e) => {
    dispatch(selectDevice(e.key))
  };

  if (loading) {
    return (
      <Spin tip="Loading..." />
    );
  } else if (hasErrors) {
    return (
      < Empty description="Error fetching devices" />
    );
  } else if (devices.length == 0) {
    return (
      <Empty description="No devices found" />
    );
  } else {
    return (
        <Menu mode='inline' onClick={handleMenuClick}
          selectedKeys={[selected]}
        >
          {
            devices.map((device) => {
              return (
                <SubMenu key={device.device_id} title={device.device_id}>
                  {device.sensors.map((sensor, key) => (
                    <Menu.Item key={device.device_id + "/" + sensor.sensor_id}>{sensor.sensor_id}</Menu.Item>
                  ))}
                </SubMenu>
              );
            })
          }
        </Menu>
    );
  }
}

// export default DeviceMenu
