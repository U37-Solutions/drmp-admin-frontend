import { UserOutlined } from '@ant-design/icons';
import { Avatar, Tooltip } from 'antd';
import clsx from 'clsx';
import dayjs from 'dayjs';

import type { ChatHistoryEntryDTO } from '@features/chat/types.ts';
import { useSessionInfo } from '@features/session/store.ts';

import styles from './Message.module.scss';

const Message = ({ message }: { message: ChatHistoryEntryDTO }) => {
  const sessionInfo = useSessionInfo();
  const isClientMessage = message.senderType === 'client';

  const userName = `${sessionInfo?.firstName} ${sessionInfo?.lastName} (ви)`;

  return (
    <div className={clsx(styles.messageWrapper, !isClientMessage && styles.messageWrapperReversed)}>
      <Tooltip title={isClientMessage ? 'Анонімний користувач' : userName}>
        <Avatar icon={isClientMessage && <UserOutlined />}>
          {!isClientMessage && (
            <>
              {sessionInfo?.firstName?.slice(0, 1)}
              {sessionInfo?.lastName?.slice(0, 1)}
            </>
          )}
        </Avatar>
      </Tooltip>
      <p className={styles.message}>{message.content}</p>
      <span className={styles.timeStamp}>{dayjs(message.sentAt).locale('uk').format('DD.MM.YY HH:mm')}</span>
    </div>
  );
};

export default Message;
