import React, { useEffect } from "react";
import { Layout, Menu, Spin, Empty } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchDevices,
  devicesSelector,
  selectDevice,
  updateOpenMenus,
} from "../../slices/devices";
import { SensorStatusIcon } from "../icons/StatusIcon";
import './menus.css'

const { Sider } = Layout;
const { SubMenu } = Menu;

const DeviceMenu = () => {
  const dispatch = useDispatch();
  const { devices, loading, hasErrors, selected, openKeys } = useSelector(
    devicesSelector
  );

  useEffect(() => {
    dispatch(fetchDevices());
  }, [dispatch]);

  const handleMenuClick = ({ key }) => {
    console.log(key, " selected");
    dispatch(selectDevice(key));
  };

  const handleOpenChange = (keys) => {
    console.log(keys);
    dispatch(updateOpenMenus(keys));
  };

  const renderMenu = () => {
    if (loading) {
      return (
        <div class='device-menu-loading'>
          <Spin tip="Loading..." />
        </div>  
      );
    } else if (hasErrors) {
      return <Empty description="Error fetching devices" />;
    } else if (devices.length === 0) {
      return <Empty description="No devices found" />;
    } else {
      return (
        <Menu
          mode="inline"
          onClick={handleMenuClick}
          selectedKeys={[selected]}
          openKeys={openKeys}
          onOpenChange={handleOpenChange}
          defaultOpenKeys={[devices[0].device_id]}
        >
          {devices.map((device) => (
            <SubMenu
              key={device.device_id}
              title={device.device_id}
              disabled={!device.active}
            >
              {device.sensors.map((sensor, key) => (
                <Menu.Item
                  disabled={!device.active}
                  key={device.device_id + "/" + sensor.sensor_id}
                >
                  {SensorStatusIcon({
                    name: sensor.sensor_id,
                    active: sensor.active,
                    connected: device.active,
                  })}
                </Menu.Item>
              ))}
            </SubMenu>
          ))}
        </Menu>
      );
    }
  };

  return (
    <Sider width="15%" theme="light" collapsible="false">
      {renderMenu()}
    </Sider>
  );
};

export default DeviceMenu;
