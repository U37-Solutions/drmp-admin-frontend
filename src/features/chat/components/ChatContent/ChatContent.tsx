import { SendOutlined } from '@ant-design/icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Flex, Input, Skeleton, Tooltip } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';

import { getChatHistory } from '@features/chat/api.ts';
import ChatHeader from '@features/chat/components/ChatContent/ChatHeader.tsx';
import Message from '@features/chat/components/Message/Message.tsx';
import type { ChatDTO, ChatHistoryEntryDTO } from '@features/chat/types.ts';

import { useAlertContext } from '@shared/providers/AlertProvider.tsx';

import styles from './ChatContent.module.scss';

const ChatContent = ({ chat, handleClose }: { chat: ChatDTO; handleClose(): void }) => {
  const alertContext = useAlertContext();
  const queryClient = useQueryClient();

  const socketRef = useRef<WebSocket | null>(null);
  const messageListRef = useRef<HTMLDivElement | null>(null);

  const [curMsg, setCurMsg] = useState<string>('');

  const { data, isPending } = useQuery<Array<ChatHistoryEntryDTO>>({
    queryKey: ['chat-history', chat.accessToken],
    queryFn: async () => await getChatHistory(chat.accessToken),
    enabled: !!chat.accessToken,
  });

  const sendMessage = useCallback(
    (msg: string) => {
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(
          JSON.stringify({
            chatId: chat.id,
            content: msg,
            senderType: 'admin',
            accessToken: chat.accessToken,
          }),
        );

        setCurMsg('');
      }
    },
    [chat.id, chat.accessToken],
  );

  useEffect(() => {
    if (!chat.accessToken || chat.archived) return;

    const socket = new WebSocket(`${import.meta.env.VITE_SOCKET_URL}/chat?token=${chat.accessToken}`);
    socketRef.current = socket;

    socket.onerror = (error) => {
      if (alertContext && error) {
        alertContext.openNotification('Виникла помилка. Спробуйте ще раз або зверніться до адміністратора', 'error');
      }
    };

    socket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);

      queryClient.setQueryData(['chat-history', chat.accessToken], (oldMessages: Array<ChatHistoryEntryDTO> = []) => [
        ...oldMessages,
        newMessage,
      ]);
    };

    return () => {
      socket.close();
    };
  }, [alertContext, chat.accessToken, chat.archived, queryClient]);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [data]);

  return (
    <Flex vertical gap={16} className={styles.wrapper}>
      <ChatHeader chat={chat} handleClose={handleClose} />
      <div className={styles.messageList} ref={messageListRef}>
        <Skeleton loading={isPending}>
          {(data || []).map((message) => (
            <Message message={message} />
          ))}
        </Skeleton>
      </div>
      {!chat.archived && (
        <Flex gap={4} className={styles.inputCard}>
          <Input
            placeholder="Введіть ваше повідомлення тут..."
            onPressEnter={(e) => sendMessage((e.target as HTMLInputElement).value)}
            onChange={(e) => setCurMsg(e.target.value)}
            value={curMsg}
          />
          <Tooltip title="Надіслати">
            <Button
              disabled={!curMsg.trim().length}
              style={{ paddingLeft: '3px' }}
              shape="circle"
              onClick={() => sendMessage(curMsg)}
            >
              <SendOutlined />
            </Button>
          </Tooltip>
        </Flex>
      )}
    </Flex>
  );
};

export default ChatContent;
