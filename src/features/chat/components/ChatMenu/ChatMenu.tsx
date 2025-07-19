import { Flex, Menu, type MenuProps } from 'antd';

import type { ChatDTO } from '@features/chat/types.ts';

import styles from './ChatMenu.module.scss';

type IProps = {
  chats: Array<ChatDTO>;
  handleChangeChat(value?: ChatDTO): Promise<void>;
  activeChat?: number;
};

const ChatMenu = ({ chats, activeChat, handleChangeChat }: IProps) => {
  const items: MenuProps['items'] = chats.map((chat: ChatDTO) => ({
    key: chat.id,
    type: 'item',
    label: (
      <Flex style={{ maxWidth: '100%' }}>
        <Flex vertical gap={6} style={{ maxWidth: '100%' }}>
          <span className={styles.chatMenuItemTitle}>Чат ID: {chat.id}</span>
          <span className={styles.chatMenuItemText}>{chat.lastMessage}</span>
        </Flex>
      </Flex>
    ),
    className: styles.menuItem,
  }));

  return (
    <Menu
      className={styles.menu}
      defaultSelectedKeys={[String(activeChat)]}
      activeKey={String(activeChat)}
      items={items}
      onClick={async ({ key }) => {
        const newChat = chats.find((chat) => String(chat.id) === key);

        return await handleChangeChat(newChat);
      }}
    />
  );
};

export default ChatMenu;
