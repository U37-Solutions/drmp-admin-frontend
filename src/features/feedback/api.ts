import apiClient from '@services/api-client.ts';

export const getFeedbacks = async () => await apiClient.get('/feedbacks').then((res) => res.data);

export const getCompanyFeedbacks = async (companyId: number) =>
  await apiClient.get(`/feedbacks/companies/${companyId}`).then((res) => res.data);

export const deleteFeedback = async (id: number) => await apiClient.delete(`/feedbacks/${id}`).then((res) => res.data);

export const assignFeedback = async (id: number, companyId: number) =>
  await apiClient.put(`/feedbacks/${id}/assign-company`, { companyId }).then((res) => res.data);
