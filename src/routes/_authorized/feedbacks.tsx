import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { Card, Input, Typography } from 'antd';
import { z } from 'zod';

import { getCompanyFeedbacks, getFeedbacks } from '@features/feedback/api.ts';
import FeedbacksTable from '@features/feedback/components/FeedbacksTable/FeedbacksTable.tsx';
import type { FeedbackDTO } from '@features/feedback/types.ts';

import useTableState from '@shared/hooks/useTableState.ts';
import { useRoleContext } from '@shared/providers/UserRoleProvider.tsx';

const getFeedbacksQuery = (companyId?: number | null) => ({
  queryKey: ['feedbacks', companyId],
  queryFn: async () => (companyId ? await getCompanyFeedbacks(companyId) : await getFeedbacks()),
});

const feedbackSearchSchema = z.object({
  page: z.number().default(1),
  pageSize: z.number().default(10),
  search: z.string().default(''),
  sortBy: z.enum(['name', 'email']).default('name'),
  sortAsc: z.boolean().default(true),
});

export const Route = createFileRoute('/_authorized/feedbacks')({
  component: RouteComponent,
  validateSearch: zodValidator(feedbackSearchSchema),
  beforeLoad: async ({ context }) => {
    const companyId = context.userRole?.companyId;

    return await context.queryClient.ensureQueryData(getFeedbacksQuery(companyId));
  },
});

function RouteComponent() {
  const roleContext = useRoleContext();
  const { data } = useSuspenseQuery<Array<FeedbackDTO>>(getFeedbacksQuery(roleContext?.companyId));
  const { search, changeSearch } = useTableState('/_authorized/feedbacks');

  return (
    <Card
      title={
        <Typography.Title level={3} style={{ marginBottom: 0 }}>
          Відгуки
        </Typography.Title>
      }
      style={{ margin: 20 }}
      styles={{ body: { padding: 0 } }}
      extra={<Input.Search allowClear defaultValue={search} placeholder="Пошук" onSearch={changeSearch} />}
    >
      <FeedbacksTable data={data} isCompanyFlow={!!roleContext?.companyId} />
    </Card>
  );
}
