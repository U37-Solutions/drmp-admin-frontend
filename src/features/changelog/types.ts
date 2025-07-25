import type { CompanyDTO } from '@features/company/types.ts';
import type { OfficeDTO } from '@features/office/types.ts';
import type { UserDTO } from '@features/users/types.ts';

export enum ChangelogAction {
  UPDATE = 'update',
  CREATE = 'create',
  DELETE = 'delete',
}

export interface ChangelogEntry {
  timestamp: string;
  email: string;
  action: ChangelogAction;
  prevValue: string | null;
  newValue: string | null;
}

export type ChangelogValueUnion = CompanyDTO | OfficeDTO | UserDTO;

export interface FormattedChangelogEntry<K extends ChangelogValueUnion>
  extends Omit<ChangelogEntry, 'prevValue' | 'newValue'> {
  newValue: K | null;
  prevValue: K | null;
}

export type CompanyChangelog = FormattedChangelogEntry<CompanyDTO>;
export type OfficeChangelog = FormattedChangelogEntry<OfficeDTO>;
export type UsersChangelog = FormattedChangelogEntry<UserDTO>;
