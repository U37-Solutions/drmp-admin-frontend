import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Empty } from 'antd';

import ChangelogTable from '@features/changelog/components/ChangelogTable/ChangelogTable.tsx';
import { createCompanyChangelogQueryOptions } from '@features/changelog/queries.ts';
import type { CompanyChangelog } from '@features/changelog/types.ts';

export const Route = createFileRoute('/_authorized/_companyAdmin/companies/$companyId/logs')({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(createCompanyChangelogQueryOptions(params.companyId));
  },
});

function RouteComponent() {
  const { companyId } = Route.useParams();
  const { data } = useQuery<Array<CompanyChangelog>>(createCompanyChangelogQueryOptions(companyId));

  if (!data) {
    return <Empty description="Немає даних у журналі" />;
  }

  return <ChangelogTable data={data} />;
}
