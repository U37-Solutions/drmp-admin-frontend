import type { AlertProps } from 'antd';

export enum LoginPrevStateFeedback {
  signUpSuccess = 'signUpSuccess',
  signUpFail = 'signUpFail',
  resetPasswordSuccess = 'resetPasswordSuccess',
  sessionExpired = 'sessionExpired',
}

export const LOGIN_PREV_STATE_FEEDBACK: Record<LoginPrevStateFeedback, AlertProps> = {
  signUpSuccess: {
    message: 'Реєстрація успішна',
    description: 'Тепер ви можете увійти, використовуючи електронну пошту та пароль',
    type: 'success',
  },
  signUpFail: {
    message: 'Посилання для реєстрації застаріле',
    description: 'Зверніться до адміністратора для отримання нового запрошення',
    type: 'error',
  },
  resetPasswordSuccess: {
    message: 'Пароль успішно змінено',
    description: 'Тепер ви можете увійти, використовуючи новий пароль',
    type: 'success',
  },
  sessionExpired: {
    message: 'Час сесії вичерпано',
    description: 'Будь ласка, увійдіть знову',
    type: 'error',
  },
};
