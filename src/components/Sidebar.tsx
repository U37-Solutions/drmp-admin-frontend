import {
  ApartmentOutlined,
  BankOutlined,
  FormOutlined,
  MailOutlined,
  MessageOutlined,
  TeamOutlined,
} from '@ant-design/icons';
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

const getNavItems = (companyId?: string): Record<Role, MenuProps['items']> => ({
  COMPANY_USER: [
    {
      key: '/chats',
      label: <Link to="/chats">Чати</Link>,
      icon: <MessageOutlined />,
    },
    {
      key: '/feedbacks',
      label: <Link to="/feedbacks">Відгуки</Link>,
      icon: <MailOutlined />,
    },
  ],
  COMPANY_ADMIN: [
    {
      key: '/chats',
      label: <Link to="/chats">Чати</Link>,
      icon: <MessageOutlined />,
    },
    ...(companyId
      ? [
          {
            key: '/companies',
            label: (
              <Link to="/companies/$companyId" params={{ companyId }}>
                Організація
              </Link>
            ),
            icon: <BankOutlined />,
          },
        ]
      : []),
    {
      key: '/feedbacks',
      label: <Link to="/feedbacks">Відгуки</Link>,
      icon: <MailOutlined />,
    },
  ],
  ADMIN: [
    {
      key: '/users',
      label: <Link to="/users">Користувачі</Link>,
      icon: <TeamOutlined />,
    },
    {
      key: '/companies',
      label: <Link to="/companies">Організації</Link>,
      icon: <BankOutlined />,
    },
    {
      key: '/form-edit',
      label: <Link to="/form-edit">Анкета реєстрації</Link>,
      icon: <FormOutlined />,
    },
    {
      key: '/offices',
      label: <Link to="/offices">Офіси</Link>,
      icon: <ApartmentOutlined />,
    },
    {
      key: '/feedbacks',
      label: <Link to="/feedbacks">Відгуки</Link>,
      icon: <MailOutlined />,
    },
  ],
  EDITOR: [
    {
      key: '/users',
      label: <Link to="/users">Користувачі</Link>,
      icon: <TeamOutlined />,
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
    {
      key: '/feedbacks',
      label: <Link to="/feedbacks">Відгуки</Link>,
      icon: <MailOutlined />,
    },
  ],
});

const Sidebar = () => {
  const location = useLocation();
  const roleContext = useRoleContext();

  const items = useMemo(() => {
    if (!roleContext) {
      return [];
    }

    return getNavItems(String(roleContext?.companyId))[roleContext.role] || [];
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
        activeKey={activeKey}
        defaultSelectedKeys={[activeKey]}
      />
    </Sider>
  );
};

export default Sidebar;
