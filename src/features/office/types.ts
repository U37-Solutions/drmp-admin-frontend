export interface OfficeDTO {
  id: number;
  workSchedule: string;
  donorSupport?: string;
  additionalDescription?: string;
  locationName: string;
  latitude: number;
  longitude: number;
  regionId: number;
  companyId: number;
  companyName: string;
  serviceIds: number[];
  categoryIds: number[];
  conditionIds: number[];
}
