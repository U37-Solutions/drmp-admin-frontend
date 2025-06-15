import apiClient from '@services/api-client.ts';

export const getUsers = async () => await apiClient.get('/users').then((res) => res.data);
