import { ApartmentOutlined, BankOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useLocation } from '@tanstack/react-router';
import { Menu, type MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { useMemo } from 'react';

import type { Role } from '@features/session/types.ts';

import { useRoleContext } from '@shared/providers/UserRoleProvider.tsx';

const siderStyle: React.CSSProperties = {
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
};

const navItems: Record<Role, MenuProps['items']> = {
  COMPANY_USER: [
    {
      key: '/chats',
      label: <Link to="/chats">Чати</Link>,
      icon: <MessageOutlined />,
    },
  ],
  COMPANY_ADMIN: [
    {
      key: '/chats',
      label: <Link to="/chats">Чати</Link>,
      icon: <MessageOutlined />,
    },
    {
      key: '/company',
      label: <Link to="/company">Організація</Link>,
      icon: <BankOutlined />,
    },
  ],
  ADMIN: [
    {
      key: '/users',
      label: <Link to="/users">Користувачі</Link>,
      icon: <UserOutlined />,
    },
    {
      key: '/companies',
      label: <Link to="/companies">Організації</Link>,
      icon: <BankOutlined />,
    },
    {
      key: '/offices',
      label: <Link to="/offices">Офіси</Link>,
      icon: <ApartmentOutlined />,
    },
  ],
  EDITOR: [
    {
      key: '/users',
      label: <Link to="/users">Користувачі</Link>,
      icon: <UserOutlined />,
    },
    {
      key: '/companies',
      label: <Link to="/companies">Організації</Link>,
      icon: <BankOutlined />,
    },
    {
      key: '/offices',
      label: <Link to="/offices">Офіси</Link>,
      icon: <ApartmentOutlined />,
    },
  ],
};

const Sidebar = () => {
  const location = useLocation();
  const roleContext = useRoleContext();

  const items = useMemo(() => {
    if (!roleContext) {
      return [];
    }

    return navItems[roleContext.role] || [];
  }, [roleContext]);

  const activeKey: string = useMemo(
    () => (items.find((item) => location.pathname.includes(String(item?.key)))?.key as string) || '',
    [items, location.pathname],
  );

  if (!roleContext) {
    return null;
  }

  return (
    <Sider breakpoint="md" collapsedWidth={0} style={siderStyle}>
      <Menu
        style={{ height: '100%' }}
        items={navItems[roleContext.role]}
        mode="inline"
        activeKey={activeKey}
        defaultSelectedKeys={[activeKey]}
      />
    </Sider>
  );
};

export default Sidebar;
