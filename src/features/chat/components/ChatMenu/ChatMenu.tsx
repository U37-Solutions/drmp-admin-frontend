import { Menu, type MenuProps } from 'antd';

import type { ChatDTO } from '@features/chat/types.ts';

import styles from './ChatMenu.module.scss';

type IProps = {
  chats: Array<ChatDTO>;
  handleChangeChat(value?: ChatDTO): void;
  activeChat?: string;
};

const ChatMenu = ({ chats, activeChat, handleChangeChat }: IProps) => {
  const items: MenuProps['items'] = chats.map((chat: ChatDTO) => ({
    key: chat.accessToken,
    type: 'item',
    label: `Чат ID: ${chat.id}`,
  }));

  return (
    <Menu
      className={styles.menu}
      activeKey={String(activeChat)}
      items={items}
      onClick={({ key }) => {
        const newChat = chats.find((chat) => chat.accessToken === key);

        return handleChangeChat(newChat);
      }}
    />
  );
};

export default ChatMenu;
