import { AxiosError } from 'axios';

import apiClient from '@services/api-client.ts';

export const forgotPassword = async (email: string): Promise<void> => {
  try {
    await apiClient.post('/auth/forgot-password', { email });
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.status === 404 ? new Error('Користувача з такою електронною адресою не існує') : error;
    }
  }
};

export const resetPassword = async (token: string, password: string): Promise<void> => {
  try {
    await apiClient.post('/auth/reset-password', { token, password });
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.status === 401
        ? new Error('Посилання для скидання паролю недійсне або прострочене. Спробуйте ще раз')
        : new Error('Сталася помилка при оновленні паролю. Спробуйте ще раз');
    }
  }
};
