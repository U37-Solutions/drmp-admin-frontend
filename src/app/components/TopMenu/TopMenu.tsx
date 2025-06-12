'use client';
import { LogoutOutlined, MoonOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, MenuProps } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { useSessionInfo, useSetSessionInfo } from '@/features/session/store';

type IProps = {
  setLoading: (loading: boolean) => void;
};

const menuItems: MenuProps['items'] = [
  {
    key: 'profile',
    icon: <SettingOutlined />,
    label: <Link href="/profile">Мій профіль</Link>,
  },
  {
    key: 'theme-switch',
    icon: <MoonOutlined />,
    label: 'Змінити тему',
  },
  {
    key: 'logout',
    icon: <LogoutOutlined />,
    danger: true,
    label: 'Вийти',
  },
];

const TopMenu = ({ setLoading }: IProps) => {
  const router = useRouter();

  const sessionInfo = useSessionInfo();
  const setSessionInfo = useSetSessionInfo();

  const handleThemeSwitch = () => {
    const currentTheme = localStorage.getItem('theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    localStorage.setItem('theme', newTheme);
    window.location.reload();
  };

  const handleLogout = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/auth/logout', { method: 'POST' });

    if (res.ok) {
      setSessionInfo(null);
      router.replace('/login');
    }
  }, [setLoading, setSessionInfo, router]);

  const handleMenuItemClick: MenuProps['onClick'] = useCallback(
    async ({ key }: { key: string }) => {
      switch (key) {
        case 'theme-switch':
          handleThemeSwitch();
          break;
        case 'logout':
          await handleLogout();
          break;
        default:
          break;
      }
    },
    [handleLogout],
  );

  if (!sessionInfo) return null;

  return (
    <Dropdown menu={{ items: menuItems, onClick: handleMenuItemClick }}>
      <Button ghost iconPosition="end" icon={<Avatar size="small" icon={<UserOutlined />} />}>
        {sessionInfo.firstName} {sessionInfo.lastName}
      </Button>
    </Dropdown>
  );
};

export default TopMenu;
