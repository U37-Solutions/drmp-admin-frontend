import { HistoryOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Button, Drawer, Tooltip } from 'antd';
import React from 'react';

import ChangelogTable from '@features/changelog/components/ChangelogTable/ChangelogTable.tsx';
import { createUsersChangelogQueryOptions } from '@features/changelog/queries.ts';
import type { UsersChangelog } from '@features/changelog/types.ts';

const UsersChangelogAction = () => {
  const { data: changeLog, refetch } = useQuery<Array<UsersChangelog>>(createUsersChangelogQueryOptions());

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
        title="Журнал змін користувачів"
        styles={{ body: { padding: 0 } }}
      >
        {changeLog && <ChangelogTable data={changeLog} />}
      </Drawer>
      <Tooltip title="Переглянути журнал змін користувачів">
        <Button onClick={handleOpenDrawer} icon={<HistoryOutlined />} />
      </Tooltip>
    </>
  );
};

export default UsersChangelogAction;
