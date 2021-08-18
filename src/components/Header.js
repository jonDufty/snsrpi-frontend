import React from 'react';
import { Layout } from 'antd';

const { Header } = Layout;

function AppHeader(){
    return (
        <Header className="site-layout-background" style={{ width: '100%' }} />
    );
}

export default AppHeader;