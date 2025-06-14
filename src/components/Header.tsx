import { Flex } from 'antd';
import { Header as AntHeader } from 'antd/es/layout/layout';

import TopMenu from '@components/TopMenu';
import { SessionInfo } from '@features/session/types';

const Header = ({ sessionInfo }: { sessionInfo: SessionInfo }) => {
  return (
    <AntHeader>
      <Flex justify="end" gap={8} align="center" style={{ height: '100%' }}>
        <TopMenu sessionInfo={sessionInfo} />
      </Flex>
    </AntHeader>
  );
};

export default Header;
