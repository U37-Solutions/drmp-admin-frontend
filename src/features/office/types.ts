import type { CustomFieldValueDTO } from '@features/formEdit/types.ts';

import type { Region } from '@components/map/types';

export type OfficeDTO = {
  id: number;
  workSchedule: string;
  additionalDescription: string | null;
  locationName: string | null;
  latitude: number | null;
  longitude: number | null;
  regionId: Region;
  companyId: number;
  companyName: string;
  serviceIds: number[];
  categoryIds: number[];
  conditionIds: number[];
  customFields: Array<CustomFieldValueDTO>;
};

export type CreateOfficeDTO = {
  workSchedule: string;
  additionalDescription: string | null;
  locationName: string | null;
  latitude: number | null;
  longitude: number | null;
  regionId: Region;
  serviceIds: number[];
  categoryIds: number[];
  conditionIds: number[];
  customFields?: unknown[];
};
