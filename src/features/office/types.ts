import type { CustomFieldValueDTO } from '@features/formEdit/types.ts';

import type { Region } from '@components/map/types';

export type OfficeDTO = {
  id: number;
  workSchedule: string;
  additionalDescription: string;
  locationName: string;
  latitude: number;
  longitude: number;
  regionId: Region;
  companyId: number;
  companyName: string;
  serviceIds: number[];
  categoryIds: number[];
  conditionIds: number[];
  customFields: Array<CustomFieldValueDTO>;
  city?: string;
  isFree: boolean;
};

export type CreateOfficeDTO = {
  workSchedule: string;
  additionalDescription: string;
  locationName: string;
  latitude: number;
  longitude: number;
  regionId: Region;
  serviceIds: number[];
  categoryIds: number[];
  conditionIds: number[];
  customFields?: unknown[];
};
