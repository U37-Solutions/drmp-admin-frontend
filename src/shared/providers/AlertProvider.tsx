import { message } from 'antd';
import React from 'react';

import AlertDialog from '@components/AlertDialog.tsx';

export interface AlertProps {
  title: string | React.ReactNode;
  message: string | React.ReactNode;
  kind: 'danger' | 'primary';
  children?: React.ReactNode;
  confirm: string;
  cancel?: string | null;
  resolve(): void;
  reject?(): void;
}

type NotificationKind = 'success' | 'error' | 'warning';

export interface AlertContext {
  openDialog: (alert: AlertProps) => void;
  openNotification: (content: string | React.ReactNode, kind: NotificationKind, duration?: number) => void;
}

const AlertContext = React.createContext<AlertContext | null>(null);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alert, setAlert] = React.useState<AlertProps | null>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const openDialog = React.useCallback((alert: AlertProps) => {
    setAlert(alert);
  }, []);

  const closeAlert = React.useCallback(() => {
    setAlert(null);
  }, []);

  const openNotification = React.useCallback(
    async (content: string | React.ReactNode, kind: NotificationKind, duration: number = 3) => {
      await messageApi.open({
        type: kind,
        content,
        duration,
        style: {
          marginTop: '3vh',
        },
      });
    },
    [messageApi],
  );

  return (
    <AlertContext.Provider value={{ openDialog, openNotification }}>
      <>
        {contextHolder}
        {children}
        {alert && (
          <AlertDialog
            {...alert}
            reject={() => {
              closeAlert();
              if (alert.reject) {
                alert.reject();
              }
            }}
            resolve={() => {
              closeAlert();
              alert.resolve();
            }}
          />
        )}
      </>
    </AlertContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAlertContext = () => {
  return React.useContext(AlertContext);
};
