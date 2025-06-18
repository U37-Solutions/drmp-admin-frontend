import { theme } from 'antd';
import type { ThemeConfig } from 'antd/lib';

import common from './common';

export default {
  ...common,
  algorithm: theme.defaultAlgorithm,
} as ThemeConfig;
