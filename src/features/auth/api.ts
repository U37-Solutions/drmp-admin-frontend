import { AxiosError } from 'axios';

import type { SignUpCompanySchema, TSignUpForm } from '@features/auth/validation.ts';

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

export const signUp = async (data: Omit<TSignUpForm, 'confirmPassword'>): Promise<void> => {
  try {
    await apiClient.post('/confirm-registration', data);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.status === 401
        ? new Error('Посилання для реєстрації недійсне або прострочене. Звʼяжіться із адміністратором')
        : new Error('Сталася помилка при спробі реєстрації. Спробуйте ще раз');
    }
  }
};

interface UserTempData {
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
}

export const getUserByTempToken = async (token: string): Promise<UserTempData> =>
  await apiClient
    .get(`/temporary/${token}`)
    .catch((error) => {
      throw new Error(error.message);
    })
    .then((res) => res.data);

export const getUserByTempTokenOptions = (token: string) => ({
  queryKey: ['user-temporary', token],
  queryFn: async () => await getUserByTempToken(token),
});

export const signUpCompany = async (data: SignUpCompanySchema): Promise<void> => {
  try {
    await apiClient.post('/company-register', {
      name: data.name,
      code: data.code,
      contactName: data.contactName,
      phone: data.phone,
      email: data.email,
      companyTypeId: data.companyTypeId,
      socials: data.socials,
      ownershipType: data.ownershipType,
      donorSupport: data.donorSupport,
      offices: [
        {
          workSchedule: data.workSchedule,
          additionalDescription: data.additionalDescription,
          locationName: data.locationName,
          latitude: data.latitude,
          longitude: data.longitude,
          regionId: data.regionId,
          serviceIds: data.serviceIds,
          categoryIds: data.categoryIds,
          conditionIds: data.conditionIds,
          customFields: data.customFields,
        },
      ],
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Сталася помилка при створенні компанії. Спробуйте ще раз');
    }
  }
};
