import { ApartmentOutlined, UserOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';

const CompanyTabs = () => {
  return (
    <Tabs
      items={[
        { label: 'Офіси', icon: <ApartmentOutlined />, key: 'offices' },
        { label: 'Користувачі', icon: <UserOutlined />, key: 'users' },
      ]}
      defaultActiveKey="offices"
    />
  );
};

export default CompanyTabs;
