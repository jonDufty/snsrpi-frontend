import { Form, Input, Button, Select, InputNumber, Switch, Spin, Typography, Space, Divider } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useState, useEffect } from 'react';
import ex_config from '../resources/config_example.js';

const { Option } = Select;
const { Text, Title } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const samples = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000];
const output_types = ['csv', 'feather'];
const time_intervals = { "min": 5, "sec": 120, "hr": 1 };

const base_url = process.env.REACT_APP_BACKEND_API_URL;
const ex_device = "rpi-arup-002";
const sensor = "CX1_1901";

const post_options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

const get_options = {
  method: 'GET',
  headers: {
    'Cache-control': 'no-cache',
  }
};


const Config = (props) => {

  const [form] = useForm();
  const [config, setConfig] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [device, setDevice] = useState(props.device);
  var new_config = config;
  
  
  console.log(props.device);
  console.log(device);

  useEffect(() => {
    console.log("New Device");
    console.log(device);
    fetchConfig();
    setDevice(() => props.device)
  }, [device, props]);

  useEffect(() => {
    console.log("Config updated");
    if (config === null) {
      console.log('Config is null');
      fetchConfig();
      console.log('fetching new config data');
    }
    new_config = config

  }, [config]);

  const url = base_url + `/api/devices/${ex_device}/sensors/${sensor}`;


  function fetchConfig() {
    fetch(url)
      .then(response => response.json())
      .then((res) => {
        setConfig(res);
        setIsLoading(false);
        console.log("new config received");
        console.log(config);
      })
      .catch((e) => console.log(e));
  }

  const onFinish = (results) => {
    console.log(results);
    Object.entries(results).map(([k, v]) => (
      new_config[k] = v
    ));

    setConfig(() => (new_config));
    var url = base_url + `/api/devices/${ex_device}/sensors/${sensor}`;
    fetch(url, post_options)
      .then(response => {
        if (response.ok) {
          console.log("Config updated successfully");
        } else {
          console.log("Updated failed");
        }
      });
  };




  useEffect(() => {
    console.log(`is loading changed to ${isLoading}`);
  }, [isLoading])

  const rules = {
    required: true,
  };

  const saveIntervalChange = (key, e) => {
    console.log(key, e);
    new_config.save_interval[key] = e;
    console.log(new_config);
  }

  if (device.device === null){
    return (<Title level={3} type='danger'> Please Select a Device</Title>);
  }

  if (isLoading) {
    return (
      <Spin tip="Loading..." />
    );
  } else {

    return (
      <Space direction='vertical'>
        <Title level={3}> {device.device} - {device.sensor}</Title>
        <Divider />
        <Form {...layout} style={{ width: 'calc(50%)' }} form={form} name='config-form' onFinish={onFinish}>
          <Form.Item name='sample_rate' label='Sample Rate (Hz)'>
            <Select defaultValue={samples[samples.length - 1]}>
              {samples.map((s) => (
                <Option value={s}>{s}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name='output_type' label='Output Type'>
            <Select defaultValue={'csv'}>
              {output_types.map((s) => (
                <Option value={s}>{s}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name='output_directory' label='Output Directory'>
            <Input addonBefore="~/" placeholder={config.output_directory} />
          </Form.Item>
          <span>
            <Form.Item label='Save Interval'>
              <Form.Item
                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
              >
                <Select defaultValue='min' placeholder={config.save_interval.unit}
                  onChange={(e) => saveIntervalChange('interval', e)}
                >
                  {Object.keys(time_intervals).map((key) =>
                    <Option value={key}>{key}</Option>
                  )}
                </Select>
              </Form.Item>
              <Form.Item
                style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
              >
                <InputNumber defaultValue={5} min={1} onChange={(e) => saveIntervalChange('interval', e)} />
              </Form.Item>
            </Form.Item>
          </span>

          <Form.Item>
            <Switch></Switch>
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Update Configuration
            </Button>
          </Form.Item>

        </Form>
      </Space>
    );
  }
}


export default Config;