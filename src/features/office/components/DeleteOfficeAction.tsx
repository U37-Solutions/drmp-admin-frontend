import { DeleteOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCanGoBack, useNavigate, useRouter } from '@tanstack/react-router';
import { Button, Tooltip } from 'antd';
import { useCallback } from 'react';

import { deleteOffice } from '@features/office/api.ts';

import { useAlertContext } from '@shared/providers/AlertProvider.tsx';

import type { OfficeDTO } from '../types';

type DeleteOfficeActionProps = {
  showText?: boolean;
  office: OfficeDTO;
  isCompanyOffice?: boolean;
  isOfficePage?: boolean;
};

const DeleteOfficeAction: React.FC<DeleteOfficeActionProps> = ({ showText, office, isCompanyOffice, isOfficePage }) => {
  const navigate = useNavigate();
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const alertContext = useAlertContext();
  const queryClient = useQueryClient();

  const { mutate: deleteMutation } = useMutation({
    mutationKey: ['delete-office', office.id],
    mutationFn: async () => {
      await deleteOffice(office.id);
      return true;
    },
    onSuccess: async () => {
      if (!alertContext) return;

      alertContext.openNotification('Офіс успішно видалено', 'success');

      if (isCompanyOffice) {
        await queryClient.refetchQueries({ queryKey: ['offices', office.companyId], type: 'all' });
      } else {
        await queryClient.refetchQueries({ queryKey: ['offices'], type: 'all' });
      }

      if (!isOfficePage) return;

      if (canGoBack) {
        router.history.back();
      } else {
        navigate({ to: '/offices' });
      }
    },
    onError: () => {
      if (alertContext) {
        alertContext.openNotification('Не вдалося видалити офіс. Спробуйте ще раз', 'error');
      }
    },
  });

  const onDelete = useCallback(() => {
    if (alertContext) {
      alertContext.openDialog({
        title: (
          <p>
            Ви дійсно бажаєте видалити офіс за адресою <strong>{office.locationName}</strong>?
          </p>
        ),
        kind: 'danger',
        message: "Всі дані пов'язані з цим офісом, будуть видалені без можливості відновлення.",
        confirm: 'Видалити',
        cancel: 'Скасувати',
        resolve: deleteMutation,
      });
    }
  }, [alertContext, office.locationName, deleteMutation]);

  return (
    <Tooltip title="Видалити офіс">
      <Button
        variant="outlined"
        color="danger"
        icon={<DeleteOutlined />}
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        {showText && 'Видалити'}
      </Button>
    </Tooltip>
  );
};

export default DeleteOfficeAction;
