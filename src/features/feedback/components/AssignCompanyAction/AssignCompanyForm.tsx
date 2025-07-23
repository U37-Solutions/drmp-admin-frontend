import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { Button, Flex, Form, Select } from 'antd';
import { Controller, useForm } from 'react-hook-form';

import { getCompanies } from '@features/company/api.ts';
import type { CompanyDTO } from '@features/company/types.ts';
import { type CompanyAssignmentSchema, assignCompanySchema } from '@features/feedback/validation.ts';

type Props = {
  onSubmit(values: CompanyAssignmentSchema): void;
  onClose(): void;
};

const AssignCompanyForm = ({ onSubmit, onClose }: Props) => {
  const { data: companies } = useQuery<Array<CompanyDTO>>({
    queryKey: ['companies', 'ACTIVE'],
    queryFn: async () => await getCompanies('ACTIVE'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyAssignmentSchema>({
    resolver: zodResolver(assignCompanySchema),
  });

  const companyOptions =
    (companies || []).map((company) => ({
      label: company.name,
      value: company.id,
    })) || [];

  return (
    <Form layout="vertical" onFinish={handleSubmit((data) => onSubmit(data))}>
      <Form.Item
        label="Організація"
        name="companyId"
        extra={!!errors.companyId?.message && <span className="field-error">{errors.companyId.message}</span>}
      >
        <Controller
          control={control}
          render={({ field }) => (
            <Select
              status={errors.companyId?.message ? 'error' : ''}
              placeholder="Оберіть організацію зі списку"
              options={companyOptions}
              {...field}
            />
          )}
          name="companyId"
        />
      </Form.Item>
      <Flex justify="flex-end" gap={12}>
        <Button onClick={onClose}>Скасувати</Button>
        <Button type="primary" variant="solid" color="primary" htmlType="submit">
          Призначити
        </Button>
      </Flex>
    </Form>
  );
};

export default AssignCompanyForm;
