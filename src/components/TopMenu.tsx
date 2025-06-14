import { LogoutOutlined, MoonOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Link, useRouter } from '@tanstack/react-router';
import { Avatar, Button, Dropdown, type MenuProps, Spin } from 'antd';
import { useCallback } from 'react';
import { useCookies } from 'react-cookie';

import apiClient from '@/services/api-client';
import { useAuth } from '@features/auth/AuthProvider';
import { SessionInfo } from '@features/session/types';

type IProps = {
  sessionInfo?: SessionInfo;
  setLoading: (loading: boolean) => void;
};

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

const TopMenu = ({ sessionInfo }: IProps) => {
  const [cookies] = useCookies(['accessToken']);
  const router = useRouter();
  const auth = useAuth();
  const { mutate: logOut, isPending } = useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => await apiClient.post('/auth/logout', { accessToken: cookies.accessToken }),
    onSuccess: () => {
      auth.logout();
      router.navigate({ to: '/login' });
    },
  });

  const handleThemeSwitch = () => {
    const currentTheme = localStorage.getItem('theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    localStorage.setItem('theme', newTheme);
    window.location.reload();
  };

  const handleMenuItemClick: MenuProps['onClick'] = useCallback(
    async ({ key }: { key: string }) => {
      switch (key) {
        case 'theme-switch':
          handleThemeSwitch();
          break;
        case 'logout':
          logOut();
          break;
        default:
          break;
      }
    },
    [logOut],
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
