import { Flex } from 'antd';

import { SOC_MEDIA_ICON_MAP } from './constants';
import type { CompanySocial } from './types';

export const formatSocMediaLabel = (type: CompanySocial['type']) => (
  <Flex gap={4} align="center">
    {SOC_MEDIA_ICON_MAP[type]}
    <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
  </Flex>
);
