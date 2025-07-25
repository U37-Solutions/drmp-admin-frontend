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
  customFields: unknown[];
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
