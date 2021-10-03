import React from 'react';
import { Layout } from 'antd';

const { Header } = Layout;

function AppHeader(){
    return (
        <Header className="site-layout-background" theme="light" style={{ width: '100%' }} />
    );
}

export default AppHeader;