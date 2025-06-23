import { AxiosError } from 'axios';

import { Role } from '@features/session/types.ts';
import type { TInviteUserForm } from '@features/users/validation.ts';

import apiClient from '@services/api-client.ts';

import type { UserDTO } from './types';

export const getUser = async (id: number) => await apiClient.get(`/users/${id}`).then((res) => res.data);

export const getUsers = async () => await apiClient.get('/users').then((res) => res.data);

export const updateUser = async (id: number, updatedUser: Partial<Omit<UserDTO, 'id'>>) =>
  await apiClient.put(`/users/${id}`, updatedUser).then((res) => res.data);

export const deleteUser = async (id: number) => await apiClient.delete(`/users/${id}`).then((res) => res.data);

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
