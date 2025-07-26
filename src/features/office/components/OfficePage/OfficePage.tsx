import { ArrowLeftOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCanGoBack, useRouter } from '@tanstack/react-router';
import { Button, Card, Flex, Typography } from 'antd';

import OfficeChangelogAction from '@features/office/components/OfficeChangelogAction.tsx';

import { useAlertContext } from '@shared/providers/AlertProvider.tsx';

import DeleteOfficeAction from '../DeleteOfficeAction';
import OfficeForm from '../OfficeForm/OfficeForm';

import styles from './OfficePage.module.scss';

import { updateOffice } from '../../api';
import type { OfficeDTO } from '../../types';
import type { OfficeSchema } from '../../validation';

type OfficePageProps = {
  data: OfficeDTO;
};

const OfficePage: React.FC<OfficePageProps> = ({ data }) => {
  const alertContext = useAlertContext();
  const queryClient = useQueryClient();
  const router = useRouter();
  const canGoBack = useCanGoBack();

  const { mutate } = useMutation({
    mutationKey: ['update-office', data.id],
    mutationFn: async (body: OfficeSchema) => {
      if (!data?.id) return;
      return await updateOffice(data.id, {
        ...data,
        ...body,
      });
    },
    onSuccess: async () => {
      if (alertContext) {
        alertContext.openNotification('Дані офісу успішно оновлено', 'success');
      }
      await queryClient.refetchQueries({ queryKey: ['office', data.id] });
    },
  });

  return (
    <div className={styles.wrapper}>
      <Card className={styles.card}>
        <Flex justify="space-between" align="center" className={styles.header}>
          <Flex gap={8} align="center">
            <Button
              onClick={() => (canGoBack ? router.history.back() : router.navigate({ to: '/offices' }))}
              type="text"
            >
              <ArrowLeftOutlined />
            </Button>
            <Typography.Title level={2} style={{ marginBottom: 0 }}>
              {data.locationName}
            </Typography.Title>
          </Flex>
          <Flex gap={8} align="center">
            <OfficeChangelogAction officeId={data.id} />
            <DeleteOfficeAction office={data} showText />
          </Flex>
        </Flex>
      </Card>
      <Card className={styles.card}>
        <OfficeForm office={data} onSubmit={(data) => mutate(data)} />
      </Card>
    </div>
  );
};

export default OfficePage;
