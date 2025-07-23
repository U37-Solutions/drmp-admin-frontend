import { Card, Flex, Typography } from 'antd';

import LocationInfoForm from '../OfficeForm/LocationInfoForm/LocationInfoForm';
import MainInfoForm from '../OfficeForm/MainInfoForm/MainInfoForm';

import styles from './OfficeForm.module.scss';

import type { OfficeDTO, OfficeSubmittedFormData } from '../../types';
import type { OfficeLocationInfoSchema, OfficeMainInfoSchema } from '../../validation';

type OfficeFormProps = {
  data?: OfficeDTO;
  onSubmit: (data: OfficeSubmittedFormData) => void;
  isPending?: boolean;
};

const OfficeForm = ({ data, onSubmit, isPending }: OfficeFormProps) => {
  const handleSubmitMainInfo = (data: OfficeMainInfoSchema) => {
    onSubmit?.({ mainInfo: data });
  };

  const handleSubmitLocationInfo = (data: OfficeLocationInfoSchema) => {
    onSubmit?.({ locationInfo: data });
  };

  return (
    <Flex gap={20} wrap="wrap">
      <Card className={styles.card}>
        <Typography.Title level={4}>Основна інформація</Typography.Title>
        <MainInfoForm office={data} onSubmit={handleSubmitMainInfo} isPending={isPending} />
      </Card>
      <Card className={styles.card}>
        <Typography.Title level={4}>Локація</Typography.Title>
        <LocationInfoForm office={data} onSubmit={handleSubmitLocationInfo} isPending={isPending} />
      </Card>
    </Flex>
  );
};

export default OfficeForm;
