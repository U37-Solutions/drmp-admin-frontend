import { Flex, Tag } from 'antd';

import { type CustomFieldDTO, type StaticFieldDTO } from '@features/formEdit/types.ts';

const FormatFieldOptions = ({ row }: { row: CustomFieldDTO | StaticFieldDTO }) => {
  if (!row.options?.length) {
    return '-';
  }

  return (
    <Flex wrap="wrap">
      {row.options.map((option, index) => (
        <Tag key={index} style={{ margin: '2px' }}>
          {typeof option === 'string' ? option : option.name}
        </Tag>
      ))}
    </Flex>
  );
};

export default FormatFieldOptions;
