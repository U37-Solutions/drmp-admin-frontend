import { HistoryOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Button, Drawer, Tooltip } from 'antd';
import React from 'react';

import ChangelogTable from '@features/changelog/components/ChangelogTable/ChangelogTable.tsx';
import { createOfficeChangelogQueryOptions } from '@features/changelog/queries.ts';
import type { OfficeChangelog } from '@features/changelog/types.ts';

const OfficeChangelogAction = ({ officeId }: { officeId: number }) => {
  const { data: changeLog, refetch } = useQuery<Array<OfficeChangelog>>(createOfficeChangelogQueryOptions(officeId));

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleOpenDrawer = async () => {
    await refetch();
    setIsDrawerOpen(true);
  };

  return (
    <>
      <Drawer
        size="large"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Журнал змін офісу"
        styles={{ body: { padding: 0 } }}
      >
        {changeLog && <ChangelogTable data={changeLog} />}
      </Drawer>
      <Tooltip title="Переглянути журнал змін офісу">
        <Button onClick={handleOpenDrawer} icon={<HistoryOutlined />} />
      </Tooltip>
    </>
  );
};

export default OfficeChangelogAction;
