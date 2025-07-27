import { ArrowLeftOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCanGoBack, useRouter } from '@tanstack/react-router';
import { Alert, Button, Card, Flex, Typography } from 'antd';
import { useMemo } from 'react';

import { updateCompany } from '@features/company/api.ts';
import CompanyTabs from '@features/company/components/CompanyTabs/CompanyTabs.tsx';
import CompanyVerificationActions from '@features/company/components/CompanyVerificationActions/CompanyVerificationActions.tsx';
import ContactInfoForm from '@features/company/components/ContactInfoForm/ContactInfoForm.tsx';
import DeleteCompanyAction from '@features/company/components/DeleteCompanyAction.tsx';
import MainInfoForm from '@features/company/components/MainInfoForm/MainInfoForm.tsx';
import type { CompanyDTO } from '@features/company/types.ts';
import type { CompanyContactSchema, CompanyInfoSchema } from '@features/company/validation.ts';
import { Permission } from '@features/session/types.ts';

import { FormatCompanyStatus } from '@components/formatters';

import { currentUserHasPermissions } from '@services/has-permissions.ts';

import { useAlertContext } from '@shared/providers/AlertProvider.tsx';

import styles from './CompanyPage.module.scss';

const CompanyPage = ({ data }: { data: CompanyDTO }) => {
  const alertContext = useAlertContext();
  const queryClient = useQueryClient();
  const router = useRouter();
  const canGoBack = useCanGoBack();

  const { mutate, isPending } = useMutation({
    mutationKey: ['update-company', data?.id],
    mutationFn: async (body: CompanyInfoSchema | CompanyContactSchema) => {
      if (!data?.id) return;
      return await updateCompany(data.id, {
        ...data,
        ...body,
      });
    },
    onSuccess: async () => {
      if (alertContext) {
        alertContext.openNotification('Дані організації успішно оновлено', 'success');
      }
      await queryClient.refetchQueries({ queryKey: ['companies', String(data?.id)] });
    },
  });

  const shouldShowVerification = useMemo(
    () =>
      (data.status === 'REVIEW' || data.status === 'REJECTED') && currentUserHasPermissions(Permission.COMPANY_VERIFY),
    [data.status],
  );

  return (
    <div className={styles.wrapper}>
      <Card className={styles.card}>
        <Flex justify="space-between" align="center" className={styles.header}>
          <Flex gap={8} align="center">
            <Button
              onClick={() => (canGoBack ? router.history.back() : router.navigate({ to: '/companies' }))}
              type="text"
            >
              <ArrowLeftOutlined />
            </Button>
            <Typography.Title level={2} style={{ marginBottom: 0 }}>
              {data.name}
            </Typography.Title>
            <FormatCompanyStatus status={data.status} variant="small" />
          </Flex>

          <Flex gap={8} align="center">
            {shouldShowVerification && <CompanyVerificationActions status={data.status} id={data.id} />}
            {currentUserHasPermissions(Permission.COMPANY_DELETE) && (
              <DeleteCompanyAction showText company={data} isCompanyPage />
            )}
          </Flex>
        </Flex>
      </Card>
      {shouldShowVerification && (
        <Alert
          type="warning"
          showIcon
          message={'Перевірте дані та вкажіть результат перевірки за допомогою кнопки "Верифікувати"'}
        />
      )}
      {data.status === 'REJECTED' && (
        <Alert
          type="info"
          showIcon
          message="Організація була відхилена. Ви можете відредагувати її дані та повторно верифікувати."
        />
      )}

      <Flex gap={20} wrap="wrap">
        <Card className={styles.card}>
          <Typography.Title level={4}>Основна інформація</Typography.Title>
          <MainInfoForm company={data} onSubmit={mutate} isPending={isPending} />
        </Card>
        <Card className={styles.card}>
          <Typography.Title level={4}>Контактна інформація</Typography.Title>
          <ContactInfoForm company={data} onSubmit={mutate} isPending={isPending} />
        </Card>
      </Flex>

      <Card className={styles.card} styles={{ body: { paddingTop: 0 } }}>
        <CompanyTabs companyId={data.id} />
      </Card>
    </div>
  );
};

export default CompanyPage;
