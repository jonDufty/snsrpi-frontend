import React from 'react';

import DeviceMenu from '../components/menus/DeviceMenu';
import { Provider } from 'react-redux';
import { store } from '../index';
import { worker } from '../mocks/browser';
import { rest } from 'msw';

const API_URL = process.env.REACT_APP_BACKEND_URL

//👇 This default export determines where your story goes in the story list
export default {
  title: 'DeviceMenu',
  component: DeviceMenu,
  decorators: [story => (
      <Provider store={store} >
          {story()}
      </Provider>
  )]
};

//👇 We create a “template” of how args map to rendering
const Template = () => <DeviceMenu />;

export const Default = Template.bind({});
export const Loading = Template.bind({});
Loading.decorators = [
  (Story) => {
    worker.use(
      rest.get(`${API_URL}/api/devices`, (req, res, ctx) => {
        // Mock an infinite loading state.
        return res(ctx.delay('infinite'))
      })
    )
    return <Story />
  },
]
export const Error = Template.bind({});
Error.decorators = [
  (Story) => {
    worker.use(
      rest.get(`${API_URL}/api/devices`, (req, res, ctx) => {
        // Mock an error state.
        return res(ctx.status(400))
      })
    )
    return <Story />
  },
]


