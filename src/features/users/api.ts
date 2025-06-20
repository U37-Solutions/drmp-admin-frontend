import { AxiosError } from 'axios';

import { Role } from '@features/session/types.ts';
import type { TInviteUserForm } from '@features/users/validation.ts';

import apiClient from '@services/api-client.ts';

export const getUsers = async () => await apiClient.get('/users').then((res) => res.data);

export const inviteUser = async (data: TInviteUserForm) =>
  await apiClient
    .post('/invite', {
      ...data,
      role: Role.EDITOR,
    })
    .catch((err) => {
      if (err instanceof AxiosError && err.response?.status === 400) {
        throw new Error('Користувач із такою електронною поштою вже існує');
      }

      throw new Error(err);
    })
    .then((res) => res.data);
