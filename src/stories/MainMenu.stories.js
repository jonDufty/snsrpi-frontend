import React from 'react';

import MainMenu from '../components/MainMenu.js';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'MainMenu',
  component: MainMenu,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <MainMenu {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {
  collapsed: false,
  onCollapse: null
};