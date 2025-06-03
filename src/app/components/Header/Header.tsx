import { MoonOutlined } from '@ant-design/icons';
import { Button, Flex, Tooltip } from 'antd';
import { Header as AntHeader } from 'antd/es/layout/layout';
import React from 'react';

const Header = () => {
  const handleThemeSwitch = () => {
    const currentTheme = localStorage.getItem('theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    localStorage.setItem('theme', newTheme);
    window.location.reload();
  };

  return (
    <AntHeader>
      <Flex justify="end" align="center" style={{ height: '100%' }}>
        <Tooltip title="Перемкнути тему">
          <Button shape="circle" icon={<MoonOutlined />} onClick={handleThemeSwitch} />
        </Tooltip>
      </Flex>
    </AntHeader>
  );
};

export default Header;
