import { HomeOutlined } from '@ant-design/icons';
import { Flex, Menu, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React from 'react';

import styles from './Sidebar.module.scss';

const siderStyle: React.CSSProperties = {
  // overflow: 'auto',
  // insetInlineStart: 0,
  // top: 0,
  // bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
};

const navItems: MenuProps['items'] = [
  {
    key: 'home',
    label: 'Головна',
    icon: <HomeOutlined />,
  },
];

const Sidebar = () => {
  return (
    <Sider style={siderStyle}>
      <Menu className={styles.menu} items={navItems} mode="inline" defaultSelectedKeys={['home']} />
    </Sider>
  );
};

export default Sidebar;
