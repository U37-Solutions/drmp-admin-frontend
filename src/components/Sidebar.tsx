import { UserOutlined } from '@ant-design/icons';
import { Link } from '@tanstack/react-router';
import { Menu, type MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';

const siderStyle: React.CSSProperties = {
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
};

const navItems: MenuProps['items'] = [
  {
    key: 'users',
    label: <Link to="/users">Користувачі</Link>,
    icon: <UserOutlined />,
  },
];

const Sidebar = () => {
  return (
    <Sider breakpoint="md" collapsedWidth={0} style={siderStyle}>
      <Menu style={{ height: '100%' }} items={navItems} mode="inline" defaultSelectedKeys={['users']} />
    </Sider>
  );
};

export default Sidebar;
