import { MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, type MenuProps } from 'antd';

type IProps = {
  actions: MenuProps['items'];
};

const UsersTableActions = ({ actions }: IProps) => {
  return (
    <Dropdown trigger={['click']} menu={{ items: actions }}>
      <Button color="primary" icon={<MoreOutlined />} />
    </Dropdown>
  );
};

export default UsersTableActions;
