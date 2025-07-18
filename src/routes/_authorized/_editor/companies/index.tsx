import { createFileRoute } from '@tanstack/react-router';
import { fallback, zodValidator } from '@tanstack/zod-adapter';
import { z } from 'zod';

import CompaniesTable from '@features/company/components/CompaniesTable/CompaniesTable.tsx';

const searchSchema = z.object({
  page: fallback(z.number(), 1).default(1),
  pageSize: fallback(z.number(), 10).default(10),
  search: fallback(z.string(), '').default(''),
  sortBy: fallback(z.enum(['id', 'name', 'status', 'email']), 'id').default('id'),
  sortAsc: fallback(z.boolean(), true).default(true),
});

export const Route = createFileRoute('/_authorized/_editor/companies/')({
  component: RouteComponent,
  validateSearch: zodValidator(searchSchema),
});

function RouteComponent() {
  return <CompaniesTable />;
}
