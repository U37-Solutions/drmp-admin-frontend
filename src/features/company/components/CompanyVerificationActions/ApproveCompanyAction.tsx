import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Spin } from 'antd';
import { AxiosError } from 'axios';

import { approveCompany } from '@features/company/api.ts';

import AlertDialog from '@components/AlertDialog.tsx';

import { type AlertProps, useAlertContext } from '@shared/providers/AlertProvider.tsx';

export interface VerifyCompanyActionProps {
  open: boolean;
  companyId: number;
  onClose(): void;
}

const ApproveCompanyAction = ({ open, companyId, onClose }: VerifyCompanyActionProps) => {
  const queryClient = useQueryClient();
  const alertContext = useAlertContext();

  const { mutate, isPending } = useMutation({
    mutationKey: ['approveCompany', companyId],
    mutationFn: async () => await approveCompany(companyId),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['companies', String(companyId)], type: 'all' });
      if (alertContext) {
        alertContext.openNotification('Організацію верифіковано', 'success');
      }
      onClose();
    },
    onError: (error) => {
      onClose();
      let errorMessage = 'Виникла помилка під час верифікації. Спробуйте ще раз або зверніться до адміністратора';

      if (error instanceof AxiosError && error.code === '400') {
        errorMessage =
          'Користувач з таким email вже існує. Будь ласка, використовуйте інший email для створення організації.';
      }

      if (alertContext) {
        alertContext.openNotification(errorMessage, 'error', 6);
      }
    },
  });

  const props: AlertProps = {
    title: 'Верифікація організації',
    kind: 'primary',
    message:
      'Ви впевнені, що хочете верифікувати дану організацію? Після підтвердження, інформація про цю організацію стане публічно доступною на мапі',
    confirm: 'Підтвердити',
    resolve: mutate,
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

export default ApproveCompanyAction;
