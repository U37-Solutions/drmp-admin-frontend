import type { Region } from '@components/map/types';

import type { OfficeLocationInfoSchema, OfficeMainInfoSchema } from './validation';

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
  customFields: unknown[];
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

export type OfficeSubmittedFormData = Partial<{
  mainInfo: OfficeMainInfoSchema;
  locationInfo: OfficeLocationInfoSchema;
}>;
