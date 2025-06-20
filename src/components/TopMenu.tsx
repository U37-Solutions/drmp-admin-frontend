import { LogoutOutlined, MoonOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Link, useRouter } from '@tanstack/react-router';
import { Avatar, Button, Dropdown, type MenuProps, Spin } from 'antd';
import { useCallback } from 'react';
import { useCookies } from 'react-cookie';

import { useAuth } from '@features/auth/AuthProvider';
import { useSessionInfo, useSetSessionInfo } from '@features/session/store.ts';

import apiClient from '@/services/api-client';

const menuItems: MenuProps['items'] = [
  {
    key: 'profile',
    icon: <SettingOutlined />,
    label: <Link to="/profile">Мій профіль</Link>,
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

const TopMenu = () => {
  const [cookies] = useCookies(['accessToken']);
  const sessionInfo = useSessionInfo();
  const setSessionInfo = useSetSessionInfo();
  const auth = useAuth();
  const router = useRouter();

  const { mutate: logOut, isPending } = useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => await apiClient.post('/auth/logout', { accessToken: cookies.accessToken }),
    onSuccess: () => {
      auth.logout();
    },
    onSettled: () => {
      router.navigate({ to: '/login' });
    },
  });

  const handleThemeSwitch = () => {
    const currentTheme = localStorage.getItem('theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    localStorage.setItem('theme', newTheme);
    window.location.reload();
  };

  const handleLogout = useCallback(() => {
    logOut();
    setSessionInfo(null);
  }, [logOut, setSessionInfo]);

  const handleMenuItemClick: MenuProps['onClick'] = useCallback(
    async ({ key }: { key: string }) => {
      switch (key) {
        case 'theme-switch':
          handleThemeSwitch();
          break;
        case 'logout':
          handleLogout();
          break;
        default:
          break;
      }
    },
    [handleLogout],
  );

  if (!sessionInfo) return null;

  return (
    <>
      <Spin spinning={isPending} fullscreen />
      <Dropdown menu={{ items: menuItems, onClick: handleMenuItemClick }}>
        <Button ghost iconPosition="end" icon={<Avatar size="small" icon={<UserOutlined />} />}>
          {sessionInfo.firstName} {sessionInfo.lastName}
        </Button>
      </Dropdown>
    </>
  );
};

export default TopMenu;
