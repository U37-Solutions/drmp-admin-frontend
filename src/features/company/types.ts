export type CompanyStatus = 'REVIEW' | 'ACTIVE' | 'REJECTED';

export interface CompanySocial {
  type: 'facebook' | 'instagram' | 'website';
  url: string;
}

// I need to create interfaces for the company and its related types
export interface CompanyDTO {
  id: number;
  name: string;
  code: string;
  contactName: string;
  phone: string;
  email: string;
  status: CompanyStatus;
  companyTypeId: number;
  userId: number;
  socials: Array<CompanySocial>;
  ownershipType: string;
  donorSupport?: string;
}
