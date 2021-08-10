import { Form, Input, Button, Select, InputNumber, Switch } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { property } from 'lodash';
import React, { useState, useEffect } from 'react';
import ex_config from '../resources/config_example.js';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const samples = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000];
const output_types = ['csv', 'feather'];
const time_intervals = { "min": 5, "sec": 120, "hr": 1 };



const Config = () => {

  const [form] = useForm();
  const [config, setConfig] = useState(ex_config);

  const new_config = config;

  const onFinish = (results) => {
    console.log(results);
    Object.entries(results).map(([k,v]) => (
      new_config[k] = v
    ))
    setConfig(() => (new_config));
  };

  useEffect(() => {
    console.log("Config updated")
    // for (property in config) {
    //   console.log(`${property}:${config[property]}`);
    // };
  }, [config]);

  const rules = {
    required: true,
  };

  const saveIntervalChange = (key, e) => {
    console.log(key, e);
    new_config.save_interval[key] = e;
    console.log(new_config);
  }

  return (
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
            onChange={(e) => saveIntervalChange('interval',e)}
            >
              {Object.keys(time_intervals).map((key) =>
                <Option value={key}>{key}</Option>
              )}
            </Select>
          </Form.Item>
          <Form.Item
            style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
          >
            <InputNumber defaultValue={5} min={1} onChange={(e) => saveIntervalChange('interval',e)}/>
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
  );
}

// class Config extends React.Component {
//   formRef = React.createRef();
//   onGenderChange = (value) => {
//     switch (value) {
//       case 'male':
//         this.formRef.current.setFieldsValue({
//           note: 'Hi, man!',
//         });
//         return;

//       case 'female':
//         this.formRef.current.setFieldsValue({
//           note: 'Hi, lady!',
//         });
//         return;

//       case 'other':
//         this.formRef.current.setFieldsValue({
//           note: 'Hi there!',
//         });
//     }
//   };
//   onFinish = (values) => {
//     console.log(values);
//   };
//   onReset = () => {
//     this.formRef.current.resetFields();
//   };
//   onFill = () => {
//     this.formRef.current.setFieldsValue({
//       note: 'Hello world!',
//       gender: 'male',
//     });
//   };

//   render() {
//     return (
//       <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
//         <Form.Item
//           name="note"
//           label="Note"
//           rules={[
//             {
//               required: true,
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>
//         <Form.Item
//           name="gender"
//           label="Gender"
//           rules={[
//             {
//               required: true,
//             },
//           ]}
//         >
//           <Select
//             placeholder="Select a option and change input text above"
//             onChange={this.onGenderChange}
//             allowClear
//           >
//             <Option value="male">male</Option>
//             <Option value="female">female</Option>
//             <Option value="other">other</Option>
//           </Select>
//         </Form.Item>
//         <Form.Item
//           noStyle
//           shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
//         >
//           {({ getFieldValue }) =>
//             getFieldValue('gender') === 'other' ? (
//               <Form.Item
//                 name="customizeGender"
//                 label="Customize Gender"
//                 rules={[
//                   {
//                     required: true,
//                   },
//                 ]}
//               >
//                 <Input />
//               </Form.Item>
//             ) : null
//           }
//         </Form.Item>
//         <Form.Item {...tailLayout}>
//           <Button type="primary" htmlType="submit">
//             Submit
//           </Button>
//           <Button htmlType="button" onClick={this.onReset}>
//             Reset
//           </Button>
//           <Button type="link" htmlType="button" onClick={this.onFill}>
//             Fill form
//           </Button>
//         </Form.Item>
//       </Form>
//     );
//   }
// }

export default Config;