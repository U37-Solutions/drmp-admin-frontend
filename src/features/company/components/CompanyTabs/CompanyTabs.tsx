import { ApartmentOutlined, HistoryOutlined, TeamOutlined } from '@ant-design/icons';
import { Outlet, useLocation, useNavigate } from '@tanstack/react-router';
import { Tabs } from 'antd';
import { useMemo } from 'react';

enum TabKey {
  OFFICES = 'offices',
  USERS = 'users',
  LOGS = 'logs',
}

const tabsConfig: Record<TabKey, { label: string; icon: React.ReactElement; to: string }> = {
  [TabKey.OFFICES]: { label: 'Офіси', icon: <ApartmentOutlined />, to: '/companies/$companyId' },
  [TabKey.USERS]: { label: 'Користувачі', icon: <TeamOutlined />, to: '/companies/$companyId/users' },
  [TabKey.LOGS]: { label: 'Журнал змін', icon: <HistoryOutlined />, to: '/companies/$companyId/logs' },
};

type Props = {
  companyId: number;
};

const CompanyTabs = ({ companyId }: Props) => {
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
        onChange={(key: string) =>
          navigate({ to: tabsConfig[key as TabKey].to, replace: true, params: { companyId: String(companyId) } })
        }
        items={tabs.map(([key, tab]) => ({ key, label: tab.label, icon: tab.icon }))}
      />
      <Outlet />
    </>
  );
};

export default CompanyTabs;
