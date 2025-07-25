import { Flex, Typography } from 'antd';
import { useFormContext } from 'react-hook-form';

import LocationInfoForm from '../OfficeForm/LocationInfoForm/LocationInfoForm';
import MainInfoForm from '../OfficeForm/MainInfoForm/MainInfoForm';

import styles from './OfficeForm.module.scss';

import { type OfficeSchema } from '../../validation';

const OfficeFormContent = () => {
  const form = useFormContext<OfficeSchema>();

  return (
    <Flex className={styles.formContent}>
      <Flex className={styles.formContent__part}>
        <Typography.Title level={4}>Основна інформація</Typography.Title>
        <MainInfoForm form={form} />
      </Flex>
      <Flex className={styles.formContent__part}>
        <Typography.Title level={4}>Локація</Typography.Title>
        <LocationInfoForm form={form} />
      </Flex>
    </Flex>
  );
};

export default OfficeFormContent;
