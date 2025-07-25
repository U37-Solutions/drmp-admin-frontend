import {
  ApartmentOutlined,
  BankOutlined,
  FormOutlined,
  MailOutlined,
  MessageOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from '@tanstack/react-router';
import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import type { MenuItemType } from 'antd/es/menu/interface';
import { useMemo } from 'react';

import { Role } from '@features/session/types.ts';

import { useRoleContext } from '@shared/providers/UserRoleProvider.tsx';

const siderStyle: React.CSSProperties = {
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
};

const NAV_ITEMS: Array<MenuItemType & { access: Array<Role> }> = [
  {
    key: '/companies',
    label: <Link to="/companies">Організації</Link>,
    icon: <BankOutlined />,
    access: [Role.EDITOR, Role.ADMIN, Role.COMPANY_ADMIN],
  },
  {
    key: '/offices',
    label: <Link to="/offices">Офіси</Link>,
    icon: <ApartmentOutlined />,
    access: [Role.ADMIN, Role.EDITOR],
  },
  {
    key: '/chats',
    label: <Link to="/chats">Чати</Link>,
    icon: <MessageOutlined />,
    access: [Role.COMPANY_ADMIN, Role.COMPANY_USER],
  },
  {
    key: '/feedbacks',
    label: <Link to="/feedbacks">Відгуки</Link>,
    icon: <MailOutlined />,
    access: [Role.COMPANY_ADMIN, Role.COMPANY_USER, Role.ADMIN, Role.EDITOR],
  },
  {
    key: '/users',
    label: <Link to="/users">Користувачі</Link>,
    icon: <TeamOutlined />,
    access: [Role.ADMIN, Role.EDITOR],
  },
  {
    key: '/form-edit',
    label: <Link to="/form-edit">Анкета реєстрації</Link>,
    icon: <FormOutlined />,
    access: [Role.ADMIN],
  },
];

const Sidebar = () => {
  const location = useLocation();
  const roleContext = useRoleContext();

  const items = useMemo(() => {
    return NAV_ITEMS.filter((item) => item.access.some((role) => roleContext?.role === role));
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
        items={items}
        mode="inline"
        selectedKeys={[activeKey]}
        defaultSelectedKeys={[activeKey]}
      />
    </Sider>
  );
};

export default Sidebar;
