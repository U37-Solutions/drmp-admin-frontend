import { ArrowLeftOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCanGoBack, useRouter } from '@tanstack/react-router';
import { Button, Card, Flex, Typography } from 'antd';

import { useAlertContext } from '@shared/providers/AlertProvider.tsx';

import DeleteOfficeAction from '../DeleteOfficeAction';
import LocationInfoForm from '../Forms/LocationInfoForm/LocationInfoForm';
import MainInfoForm from '../Forms/MainInfoForm/MainInfoForm';

import styles from './OfficePage.module.scss';

import { updateOffice } from '../../api';
import type { OfficeDTO } from '../../types';
import type { OfficeLocationInfoSchema, OfficeMainInfoSchema } from '../../validation';

type OfficePageProps = {
  data: OfficeDTO;
};

const OfficePage: React.FC<OfficePageProps> = ({ data }) => {
  const alertContext = useAlertContext();
  const queryClient = useQueryClient();
  const router = useRouter();
  const canGoBack = useCanGoBack();

  const { mutate, isPending } = useMutation({
    mutationKey: ['update-office', data.id],
    mutationFn: async (body: OfficeMainInfoSchema | OfficeLocationInfoSchema) => {
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
          <DeleteOfficeAction office={data} showText />
        </Flex>
      </Card>
      <Flex gap={20} wrap="wrap">
        <Card className={styles.card}>
          <Typography.Title level={4}>Основна інформація</Typography.Title>
          <MainInfoForm office={data} onSubmit={mutate} isPending={isPending} />
        </Card>
        <Card className={styles.card}>
          <Typography.Title level={4}>Локація</Typography.Title>
          <LocationInfoForm office={data} onSubmit={mutate} isPending={isPending} />
        </Card>
      </Flex>
    </div>
  );
};

export default OfficePage;
