import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { Badge, Card, Col, Empty, Flex, Row, Skeleton, Tabs, Typography } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { z } from 'zod';

import { getChats } from '@features/chat/api.ts';
import ChatContent from '@features/chat/components/ChatContent/ChatContent.tsx';
import ChatMenu from '@features/chat/components/ChatMenu/ChatMenu.tsx';
import type { ChatDTO, ChatStatus } from '@features/chat/types.ts';

import styles from './chats.module.scss';

const searchSchema = z.object({
  chatId: z.number().optional(),
});

export const Route = createFileRoute('/_authorized/chats')({
  component: RouteComponent,
  validateSearch: zodValidator(searchSchema),
});

const chatTabs = [
  {
    key: 'active',
    label: (
      <Flex gap={8}>
        <Badge status="success" />
        <span>Активні</span>
      </Flex>
    ),
  },
  {
    key: 'archived',
    label: (
      <Flex gap={8}>
        <Badge status="error" />
        <span>Архівні</span>
      </Flex>
    ),
  },
];

function RouteComponent() {
  const { chatId } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [chatsMode, setChatsMode] = useState<ChatStatus>('active');

  const { data: chats, isPending } = useQuery<Array<ChatDTO>>({
    queryKey: ['chat', chatsMode],
    queryFn: async () => await getChats(chatsMode),
  });

  const [activeChat, setActiveChat] = useState<ChatDTO | undefined>();

  useEffect(() => {
    const chat = chats?.find((chat) => chat.id === chatId);
    setActiveChat(chat);
  }, [chatId, chats]);

  const changeActiveChat = useCallback(
    async (chat?: ChatDTO) => {
      await navigate({ search: { chatId: chat?.id } });
    },
    [navigate],
  );

  return (
    <Skeleton loading={isPending}>
      <div className={styles.wrapper}>
        <Card
          rootClassName={styles.card}
          classNames={{ body: styles.cardBody, header: styles.cardHeader }}
          title={
            <Flex align="center" justify="space-between">
              <Typography.Title level={3} style={{ marginBottom: 0 }}>
                Чати
              </Typography.Title>
              <Tabs
                className={styles.tabs}
                defaultActiveKey={chatsMode}
                items={chatTabs}
                onChange={async (activeKey) => {
                  await changeActiveChat(undefined);
                  setChatsMode(activeKey as ChatStatus);
                }}
              />
            </Flex>
          }
        >
          {!chats || !chats.length ? (
            <Empty
              description={`На даний момент у вас немає ${chatsMode === 'active' ? 'активних' : 'архівованих'} чатів`}
            />
          ) : (
            <Row style={{ height: '100%' }} className={styles.content}>
              <Col className={styles.menuCol} md={6}>
                <ChatMenu chats={chats} activeChat={chatId} handleChangeChat={changeActiveChat} />
              </Col>
              <Col md={18} flex={1}>
                {activeChat ? (
                  <ChatContent chat={activeChat} handleClose={async () => await changeActiveChat(undefined)} />
                ) : (
                  <Empty description="Оберіть чат в меню ліворуч, щоб побачити історію листування" />
                )}
              </Col>
            </Row>
          )}
        </Card>
      </div>
    </Skeleton>
  );
}
