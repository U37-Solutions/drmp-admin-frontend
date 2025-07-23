import { z } from 'zod';

export const assignCompanySchema = z.object({
  companyId: z.number({ message: 'Це поле є обовʼязковим' }),
});

export type CompanyAssignmentSchema = z.infer<typeof assignCompanySchema>;
