import { Flex } from 'antd';
import { Header as AntHeader } from 'antd/es/layout/layout';

import TopMenu from '@components/TopMenu';

const Header = () => {
  return (
    <AntHeader>
      <Flex justify="end" gap={8} align="center" style={{ height: '100%' }}>
        <TopMenu />
      </Flex>
    </AntHeader>
  );
};

export default Header;
