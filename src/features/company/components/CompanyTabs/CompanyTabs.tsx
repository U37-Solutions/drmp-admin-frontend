import { ApartmentOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons';
import { Outlet, useLocation, useNavigate, useParams } from '@tanstack/react-router';
import { Tabs } from 'antd';
import { useMemo } from 'react';

enum TabKey {
  OFFICES = 'offices',
  USERS = 'users',
  LOGS = 'logs',
}

const tabsConfig: Record<TabKey, { label: string; icon: React.ReactElement; to: string }> = {
  [TabKey.OFFICES]: { label: 'Офіси', icon: <ApartmentOutlined />, to: '/companies/$companyId' },
  // TODO: Implement users and logs tabs
  [TabKey.USERS]: { label: 'Користувачі', icon: <UserOutlined />, to: '/companies/$companyId/users' },
  [TabKey.LOGS]: { label: 'Логи', icon: <UnorderedListOutlined />, to: '/companies/$companyId/logs' },
};

const CompanyTabs: React.FC = () => {
  const { companyId } = useParams({
    from: '/_authorized/_editor/companies/$companyId',
  });
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const segments = pathname.split('/').filter(Boolean);
  const last = segments[segments.length - 1] as TabKey;
  const activeTab = [TabKey.USERS, TabKey.LOGS].includes(last) ? last : TabKey.OFFICES;

  const tabs = useMemo(() => Object.entries(tabsConfig), []);

  return (
    <>
      <Tabs
        activeKey={activeTab}
        onChange={(key: string) => navigate({ to: tabsConfig[key as TabKey].to, replace: true, params: { companyId } })}
        items={tabs.map(([key, tab]) => ({ key, label: tab.label, icon: tab.icon }))}
      />
      <Outlet />
    </>
  );
};

export default CompanyTabs;
