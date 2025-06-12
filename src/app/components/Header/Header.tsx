'use client';
import { Flex, Spin } from 'antd';
import { Header as AntHeader } from 'antd/es/layout/layout';
import React, { useState } from 'react';

import { TopMenu } from '@/app/components';

const Header = () => {
  const [loading, setLoading] = useState(false);

  return (
    <AntHeader>
      <Spin spinning={loading} fullscreen />
      <Flex justify="end" gap={8} align="center" style={{ height: '100%' }}>
        <TopMenu setLoading={setLoading} />
      </Flex>
    </AntHeader>
  );
};

export default Header;
