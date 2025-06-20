import { AxiosError } from 'axios';

export const handleError = (err: unknown) => {
  if (err instanceof AxiosError) {
    const statusCode: keyof typeof ERROR_MESSAGES = err.response?.status || 500;

    return new AxiosError(ERROR_MESSAGES[statusCode], String(statusCode), err.config, err.request, err.response);
  }

  return new AxiosError(ERROR_MESSAGES[STATUS_CODES.INTERNAL_SERVER_ERROR], '500');
};

export enum STATUS_CODES {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export const ERROR_MESSAGES = {
  [STATUS_CODES.BAD_REQUEST]: 'Неправильний запит. Перевірте введені дані',
  [STATUS_CODES.UNAUTHORIZED]: 'Ви не авторизовані. Будь ласка, увійдіть у систему',
  [STATUS_CODES.FORBIDDEN]: 'У вас немає доступу до цього ресурсу',
  [STATUS_CODES.NOT_FOUND]: 'Дані не знайдено. Перевірте посилання або зверніться до адміністратора',
  [STATUS_CODES.INTERNAL_SERVER_ERROR]: 'Внутрішня помилка сервера. Спробуйте пізніше',
};
