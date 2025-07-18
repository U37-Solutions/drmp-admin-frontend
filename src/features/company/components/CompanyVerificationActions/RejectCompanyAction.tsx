import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Form, Input, Select, Spin } from 'antd';
import { useMemo } from 'react';
import { Controller, type FieldValues, useForm } from 'react-hook-form';

import { rejectCompany } from '@features/company/api.ts';
import type { VerifyCompanyActionProps } from '@features/company/components/CompanyVerificationActions/ApproveCompanyAction.tsx';
import { Role } from '@features/session/types.ts';
import { getUsers } from '@features/users/api.ts';
import type { UserDTO } from '@features/users/types.ts';

import AlertDialog from '@components/AlertDialog.tsx';

import { type AlertProps, useAlertContext } from '@shared/providers/AlertProvider.tsx';

const RejectCompanyAction = ({ open, companyId, onClose }: VerifyCompanyActionProps) => {
  const queryClient = useQueryClient();
  const alertContext = useAlertContext();
  const { control, getValues } = useForm();

  const { data: editors } = useQuery<Array<UserDTO>>({
    queryKey: ['editors'],
    queryFn: async () => await getUsers(Role.EDITOR),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['reject', companyId],
    mutationFn: async (values: FieldValues) => await rejectCompany(companyId, values),
    onSuccess: async () => {
      onClose();

      await queryClient.refetchQueries({ queryKey: ['companies', String(companyId)], type: 'all' });
      if (alertContext) {
        alertContext.openNotification('Організацію відхилено', 'success');
      }
      onClose();
    },
    onError: () => {
      onClose();
      if (alertContext) {
        alertContext.openNotification(
          'Виникла помилка під час відмови у верифікації. Спробуйте ще раз або зверніться до адміністратора',
          'error',
        );
      }
    },
  });

  const editorsOptions = useMemo(
    () =>
      (editors || []).map((editor) => ({
        label: (
          <span>
            {editor.firstName} {editor.lastName}
            <span style={{ fontSize: '0.75rem', marginLeft: 6 }}>({editor.email})</span>
          </span>
        ),
        value: editor.id,
      })),
    [editors],
  );

  const props: AlertProps = {
    title: 'Верифікація організації',
    kind: 'danger',
    message:
      'Ви впевнені, що хочете відхилити дану організацію? ' +
      'Після підтвердження, призначена контактна особа отримає електронний лист із причиною відмови, контактами призначеного відповідального редактора, та подальшими інструкціями. ' +
      'Організація не буде видалена та матиме можливість заново пройти верифікацію',
    children: (
      <Form layout="vertical">
        <Form.Item label="Причина відмови">
          <Controller
            control={control}
            name="message"
            render={({ field }) => (
              <Input.TextArea rows={3} placeholder="Вкажіть на недоліки заповненої анкети у цьому полі" {...field} />
            )}
          />
        </Form.Item>
        <Form.Item label="Відповідальний редактор">
          <Controller
            control={control}
            name="assignedEditorId"
            render={({ field }) => (
              <Select
                options={editorsOptions}
                placeholder="Оберіть редактора, який комунікуватиме із компанією"
                {...field}
              />
            )}
          />
        </Form.Item>
      </Form>
    ),
    confirm: 'Відхилити',
    resolve: async () => mutate(getValues()),
    reject: onClose,
  };

  if (!open) return null;

  return (
    <>
      {isPending && <Spin spinning={isPending} fullscreen />}
      <AlertDialog {...props} />
    </>
  );
};

export default RejectCompanyAction;
