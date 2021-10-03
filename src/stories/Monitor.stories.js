import React from 'react';

import Monitor from '../pages/Monitor';
import { Provider } from 'react-redux';
import { store } from '../index';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Monitor',
  component: Monitor,
  decorators: [story => (
      <Provider store={store} >
          {story()}
      </Provider>
  )]
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <Monitor {...args} />;

export const Default = Template.bind({});

Default.args = {
  
};

export const Loading = Template.bind({});

Loading.args = {
  loading: true
};