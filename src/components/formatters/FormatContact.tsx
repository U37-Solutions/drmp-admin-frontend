import { PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Flex } from 'antd';

import type { CompanyDTO } from '@features/company/types.ts';

const FormatContact = ({ company }: { company: CompanyDTO }) => {
  return (
    <Flex vertical gap={8}>
      <Flex gap={2}>
        <UserOutlined />
        <span>{company.contactName}</span>
      </Flex>
      <Flex gap={2}>
        <PhoneOutlined />
        <a href={`tel:${company.phone}`}>{company.phone}</a>
      </Flex>
    </Flex>
  );
};

export default FormatContact;
