import { Flex } from 'antd';

type IProps = {
  actions: React.ReactElement[];
};

const UsersTableActions = ({ actions }: IProps) => {
  return (
    <Flex align="center" gap={8}>
      {actions}
    </Flex>
  );
};

export default UsersTableActions;
