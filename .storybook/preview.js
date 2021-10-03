import React from 'react';
import { Provider } from 'react-redux';
import {store} from '../src/index';
import { addDecorator } from '@storybook/react'
import { initializeWorker, mswDecorator } from 'msw-storybook-addon'
import { worker } from '../src/mocks/browser';

if (typeof global.process === 'undefined') {
  console.log("Starting MSW")
  worker.start()
}

// initializeWorker()
// addDecorator(mswDecorator)

import 'antd/dist/antd.css';
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <Story />
    </Provider>
  ),
]



