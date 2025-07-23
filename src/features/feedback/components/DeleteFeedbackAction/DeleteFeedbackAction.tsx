import { DeleteOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Tooltip } from 'antd';

import { deleteFeedback } from '@features/feedback/api.ts';

import { useAlertContext } from '@shared/providers/AlertProvider.tsx';

const DeleteFeedbackAction = ({ id }: { id: number }) => {
  const alertContext = useAlertContext();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ['deleteFeedback', id],
    mutationFn: async () => await deleteFeedback(id),
    onSuccess: async () => {
      if (alertContext) {
        alertContext.openNotification('Відгук успішно видалено', 'success');
      }
      await queryClient.refetchQueries({ queryKey: ['feedbacks'], type: 'all' });
    },
  });

  const handleDelete = () => {
    if (!alertContext) return;

    alertContext.openDialog({
      title: 'Ви дійсно бажаєте видалити цей відгук?',
      message: 'Цей відгук буде видалений без можливості відновлення',
      kind: 'danger',
      confirm: 'Видалити',
      resolve: mutate,
    });
  };

  return (
    <Tooltip title="Видалити відгук">
      <Button variant="outlined" color="danger" icon={<DeleteOutlined />} onClick={handleDelete} />
    </Tooltip>
  );
};

export default DeleteFeedbackAction;
