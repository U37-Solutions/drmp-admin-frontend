import { Flex } from 'antd';

import { SOC_MEDIA_ICON_MAP } from '@features/company/constants.tsx';
import type { CompanyDTO } from '@features/company/types.ts';

const FormatSocialMedia = ({ company }: { company: CompanyDTO }) => {
  return (
    <Flex vertical gap={4}>
      {company.socials.map((social) => (
        <a
          key={social.url}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          <Flex gap={4}>
            {SOC_MEDIA_ICON_MAP[social.type]}
            {social.type.charAt(0).toUpperCase() + social.type.slice(1)}
          </Flex>
        </a>
      ))}
      {!company.socials.length && <span>—</span>}
    </Flex>
  );
};

export default FormatSocialMedia;
