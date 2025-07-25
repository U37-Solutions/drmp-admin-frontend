import { PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Tooltip, Typography } from 'antd';

import UsersChangelogAction from '@features/users/components/UsersChangelogAction.tsx';

type IProps = {
  handleInviteClick: () => void;
};

const UserHeader = ({ handleInviteClick }: IProps) => {
  return (
    <Flex gap={12}>
      <Typography.Title level={3} style={{ marginBottom: 0 }}>
        Користувачі
      </Typography.Title>
      <Tooltip placement="bottom" title="Запросити нового користувача">
        <Button onClick={handleInviteClick} icon={<PlusOutlined />} />
      </Tooltip>
      <UsersChangelogAction />
    </Flex>
  );
};

export default UserHeader;
