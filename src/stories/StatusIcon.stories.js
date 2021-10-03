import React from 'react';

import {SensorStatusIcon} from '../components/icons/StatusIcon.js';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'StatusIcon',
  component: SensorStatusIcon,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <SensorStatusIcon {...args} />;

export const Active = Template.bind({});

Active.args = {
  name: "Device",
  active: true,
  connected: true
};

export const Inactive = Template.bind({});

Inactive.args = {
  name: "Device",
  active: false,
  connected: true
};

export const Offline = Template.bind({});

Offline.args = {
  name: "Device",
  active: false,
  connected: false,
};