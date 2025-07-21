import { DeleteOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from 'antd';

import { deleteCustomField } from '@features/formEdit/api.ts';
import type { CustomFieldDTO } from '@features/formEdit/types.ts';

import { useAlertContext } from '@shared/providers/AlertProvider.tsx';

const DeleteCustomFieldAction = ({ field }: { field: CustomFieldDTO }) => {
  const alertContext = useAlertContext();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ['customField', 'delete', field.id],
    mutationFn: async () => await deleteCustomField(field.id),
    onSuccess: async () => {
      if (alertContext) {
        alertContext.openNotification('Поле видалено', 'success');
      }
      await queryClient.refetchQueries({ queryKey: ['customFields'], type: 'all' });
    },
    onError: () => {
      if (alertContext) {
        alertContext.openNotification(`Щось пішло не так. Спробуйте ще раз пізніше`, 'error');
      }
    },
  });

  const handleDelete = () => {
    if (!alertContext) return;

    alertContext.openDialog({
      title: `Видалити поле ${field.title}?`,
      kind: 'danger',
      message: 'Ви впевнені, що хочете видалити це поле? Цю дію не можна скасувати.',
      confirm: 'Видалити',
      resolve: mutate,
    });
  };

  return (
    <Button
      variant="outlined"
      color="danger"
      icon={<DeleteOutlined />}
      onClick={handleDelete}
      disabled={field.id === -1}
    />
  );
};

export default DeleteCustomFieldAction;
