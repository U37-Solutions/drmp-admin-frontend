import { MessageOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useLocation } from '@tanstack/react-router';
import { Menu, type MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';

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
  ADMIN: [
    {
      key: '/users',
      label: <Link to="/users">Користувачі</Link>,
      icon: <UserOutlined />,
    },
  ],
  EDITOR: [
    {
      key: '/users',
      label: <Link to="/users">Користувачі</Link>,
      icon: <UserOutlined />,
    },
  ],
};

const Sidebar = () => {
  const location = useLocation();
  const roleContext = useRoleContext();

  if (!roleContext) {
    return null;
  }

  return (
    <Sider breakpoint="md" collapsedWidth={0} style={siderStyle}>
      <Menu
        style={{ height: '100%' }}
        items={navItems[roleContext.role]}
        mode="inline"
        activeKey={location.pathname}
        defaultSelectedKeys={[location.pathname]}
      />
    </Sider>
  );
};

export default Sidebar;
