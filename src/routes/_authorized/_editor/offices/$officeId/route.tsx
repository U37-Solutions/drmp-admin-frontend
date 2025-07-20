import { createFileRoute, redirect } from '@tanstack/react-router';

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
  // TODO: Implement office page
  // const { officeId } = Route.useParams();
  // const { data } = useSuspenseQuery(createOfficeByIdQueryOptions(+officeId));

  return <>Офісісі</>;
}
