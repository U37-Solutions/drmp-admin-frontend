import { DeleteOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCanGoBack, useNavigate, useRouter } from '@tanstack/react-router';
import { Button, Tooltip } from 'antd';
import { useCallback } from 'react';

import { deleteCompany } from '@features/company/api.ts';
import type { CompanyDTO } from '@features/company/types.ts';

import { useAlertContext } from '@shared/providers/AlertProvider.tsx';

const DeleteCompanyAction = ({
  showText,
  company,
  isCompanyPage,
}: {
  showText?: boolean;
  company: CompanyDTO;
  isCompanyPage?: boolean;
}) => {
  const navigate = useNavigate();
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const alertContext = useAlertContext();
  const queryClient = useQueryClient();

  const { mutate: deleteMutation } = useMutation({
    mutationKey: ['delete-company', company.id],
    mutationFn: async () => {
      await deleteCompany(company.id);
      return true;
    },
    onSuccess: async () => {
      if (alertContext) {
        alertContext.openNotification('Організацію успішно видалено', 'success');
        await queryClient.refetchQueries({ queryKey: ['companies'], type: 'all' });
      }

      if (!isCompanyPage) return;

      if (canGoBack) {
        router.history.back();
      } else {
        navigate({ to: '/companies' });
      }
    },
    onError: () => {
      if (alertContext) {
        alertContext.openNotification('Не вдалося видалити організацію. Спробуйте ще раз', 'error');
      }
    },
  });

  const onDelete = useCallback(() => {
    if (alertContext) {
      alertContext.openDialog({
        title: (
          <p>
            Ви дійсно бажаєте видалити організацію <strong>{company.name}</strong>?
          </p>
        ),
        kind: 'danger',
        message:
          "Всі дані, в тому числі Офіси, пов'язані з цією компанією, будуть видалені без можливості відновлення.",
        confirm: 'Видалити',
        cancel: 'Скасувати',
        resolve: deleteMutation,
        reject: () => {},
      });
    }
  }, [alertContext, company.name, deleteMutation]);

  return (
    <Tooltip title="Видалити організацію">
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

export default DeleteCompanyAction;
