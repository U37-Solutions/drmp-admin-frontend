import { DeleteOutlined, NotificationOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Flex, Tooltip } from 'antd';

import { deleteChat, unsubscribeFromChat } from '@features/chat/api.ts';
import type { ChatDTO } from '@features/chat/types.ts';

import { useAlertContext } from '@shared/providers/AlertProvider.tsx';

import styles from './ChatContent.module.scss';

const ChatHeader = ({ chat, handleClose }: { chat: ChatDTO; handleClose(): void }) => {
  const queryClient = useQueryClient();
  const alertContext = useAlertContext();
  const chatMode = chat.archived ? 'archived' : 'active';

  const { mutate: muteNotification } = useMutation({
    mutationKey: ['unsubscribe-chat', chat.id],
    mutationFn: async () => await unsubscribeFromChat(String(chat.id)),
    onSuccess: async () => {
      if (alertContext) {
        alertContext.openNotification('Сповіщення вимкнено', 'success');
      }
      await queryClient.refetchQueries({ queryKey: ['chat', chatMode], type: 'all' });
    },
  });

  const { mutate: deleteChatMutation } = useMutation({
    mutationKey: ['delete-chat', chat.id],
    mutationFn: async () => await deleteChat(String(chat.id)),
    onSuccess: async () => {
      if (alertContext) {
        alertContext.openNotification('Чат успішно видалено', 'success');
      }
      await queryClient.refetchQueries({ queryKey: ['chat', chatMode], type: 'all' });
      handleClose();
    },
  });

  const handleDeleteChat = () => {
    if (!alertContext) return;

    alertContext.openDialog({
      title: `Ви дійсно бажаєте видалити чат ${chat.id}?`,
      message: 'Всі повідомлення в чаті будуть видалені без можливості відновлення.',
      kind: 'danger',
      confirm: 'Видалити',
      cancel: 'Скасувати',
      resolve: deleteChatMutation,
      reject: () => {},
    });
  };

  return (
    <Flex justify="flex-end" gap={4} wrap="wrap" className={styles.header}>
      <Tooltip title="Вимкнути сповіщення">
        <Button
          disabled={chat.archived || !chat.notifyCompanyUser}
          icon={<NotificationOutlined />}
          onClick={() => muteNotification()}
          className={styles.actionBtn}
        />
      </Tooltip>
      <Tooltip title="Видалити чат">
        <Button variant="outlined" color="danger" icon={<DeleteOutlined />} onClick={() => handleDeleteChat()} />
      </Tooltip>
    </Flex>
  );
};

export default ChatHeader;
