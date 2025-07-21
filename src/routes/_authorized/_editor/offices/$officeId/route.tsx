import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, redirect } from '@tanstack/react-router';

import OfficePage from '@/features/office/components/OfficePage/OfficePage';
import { createOfficeByIdQueryOptions } from '@/features/office/queries';

export const Route = createFileRoute('/_authorized/_editor/offices/$officeId')({
  component: RouteComponent,
  beforeLoad: async ({ params, context }) => {
    const { officeId } = params;
    if (!officeId) {
      throw redirect({ to: '/offices' });
    }

    return context.queryClient.ensureQueryData(createOfficeByIdQueryOptions(+officeId));
  },
  onError: () => {
    throw redirect({ to: '/offices' });
  },
});

function RouteComponent() {
  const { officeId } = Route.useParams();
  const { data } = useSuspenseQuery(createOfficeByIdQueryOptions(+officeId));

  return <OfficePage data={data} />;
}
