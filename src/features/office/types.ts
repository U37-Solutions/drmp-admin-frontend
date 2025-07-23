import type { Region } from '@components/map/types';

export interface OfficeDTO {
  id: number;
  workSchedule: string;
  donorSupport?: string;
  additionalDescription?: string;
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
}
