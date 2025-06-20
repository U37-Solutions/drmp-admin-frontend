import { ConfigProvider } from 'antd';
import React, { useEffect } from 'react';

import antProviderAttributes from '@shared/ui/ant-provider-attributes.ts';
import { DarkTheme, LightTheme } from '@shared/ui/themes';

type ThemeType = 'light' | 'dark';

type IProps = {
  children: React.ReactNode;
};

const ThemeProvider = ({ children }: IProps) => {
  const [theme, setTheme] = React.useState<ThemeType>('light');

  const themeConfig = theme === 'light' ? DarkTheme : LightTheme;

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as ThemeType;
    setTheme(storedTheme);
  }, []);

  return (
    <ConfigProvider theme={themeConfig} {...antProviderAttributes}>
      {children}
    </ConfigProvider>
  );
};

export default ThemeProvider;
