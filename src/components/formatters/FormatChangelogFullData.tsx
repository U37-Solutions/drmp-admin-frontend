import { EyeOutlined } from '@ant-design/icons';
import { Button, Flex, Modal, Tooltip, Typography } from 'antd';
import React from 'react';

import type { ChangelogValueUnion, FormattedChangelogEntry } from '@features/changelog/types.ts';

const FormatChangelogFullData = ({ row }: { row: FormattedChangelogEntry<ChangelogValueUnion> }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>
      <Tooltip title="Переглянути повністю">
        <Button onClick={() => setIsModalOpen(true)} icon={<EyeOutlined />} />
      </Tooltip>
      <Modal
        width="70%"
        open={isModalOpen}
        centered
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        title={<Typography.Title level={3}>Детальна інформація</Typography.Title>}
      >
        <Flex justify="center" gap={20}>
          {!!row.prevValue && (
            <Flex vertical gap={8}>
              <Typography.Title level={5}>Попередні значення</Typography.Title>
              <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {JSON.stringify(row.prevValue, null, 2)}
              </pre>
            </Flex>
          )}

          {!!row.newValue && (
            <Flex vertical gap={8}>
              <Typography.Title level={5}>Нові значення</Typography.Title>
              <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {JSON.stringify(row.newValue, null, 2)}
              </pre>
            </Flex>
          )}
        </Flex>
      </Modal>
    </>
  );
};

export default FormatChangelogFullData;
