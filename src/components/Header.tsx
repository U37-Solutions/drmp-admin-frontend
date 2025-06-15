import { Flex } from 'antd';
import { Header as AntHeader } from 'antd/es/layout/layout';

import type { SessionInfo } from '@features/session/types';

import TopMenu from '@components/TopMenu';

const Header = ({ sessionInfo }: { sessionInfo: SessionInfo }) => {
  return (
    <AntHeader>
      <Flex justify="end" gap={8} align="center" style={{ height: '100%' }}>
        <TopMenu sessionInfo={sessionInfo} setLoading={(loading: boolean) => console.log(`Loading: ${loading}`)} />
      </Flex>
    </AntHeader>
  );
};

export default Header;
