import { UserOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import Link from 'next/link';
import React from 'react';

import styles from './Sidebar.module.scss';

const siderStyle: React.CSSProperties = {
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
};

const navItems: MenuProps['items'] = [
  {
    key: 'users',
    label: <Link href="/users">Користувачі</Link>,
    icon: <UserOutlined />,
  },
];

const Sidebar = () => {
  return (
    <Sider breakpoint="md" collapsedWidth={0} style={siderStyle}>
      <Menu className={styles.menu} items={navItems} mode="inline" defaultSelectedKeys={['users']} />
    </Sider>
  );
};

export default Sidebar;
