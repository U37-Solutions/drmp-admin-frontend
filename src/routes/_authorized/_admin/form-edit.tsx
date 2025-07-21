import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { fallback, zodValidator } from '@tanstack/zod-adapter';
import { z } from 'zod';

import { getCustomFields } from '@features/formEdit/api.ts';
import CustomFieldsTable from '@features/formEdit/components/CustomFieldsTable/CustomFieldsTable.tsx';
import type { CustomFieldDTO } from '@features/formEdit/types.ts';
import { useStaticFieldsConfig } from '@features/formEdit/useStaticFieldsConfig.ts';

const customFieldsQuery = {
  queryKey: ['customFields'],
  queryFn: async () => await getCustomFields(),
};

const searchSchema = z.object({
  page: fallback(z.number(), 1).default(1),
  pageSize: fallback(z.number(), 10).default(10),
  search: fallback(z.string(), '').default(''),
  sortBy: fallback(z.enum(['type', 'title']), 'type').default('type'),
  sortAsc: fallback(z.boolean(), true).default(true),
});

export const Route = createFileRoute('/_authorized/_admin/form-edit')({
  component: RouteComponent,
  validateSearch: zodValidator(searchSchema),
  onError: () => {
    throw redirect({ to: '/users' });
  },
  beforeLoad: ({ context }) => {
    return context.queryClient.ensureQueryData(customFieldsQuery);
  },
});

function RouteComponent() {
  const { staticFields } = useStaticFieldsConfig();
  const { data, isPending } = useSuspenseQuery<Array<CustomFieldDTO>>(customFieldsQuery);

  return <CustomFieldsTable data={[...staticFields, ...data]} loading={isPending} />;
}
