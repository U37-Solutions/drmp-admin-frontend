import type { CompanyDTO } from '../company/types';
import type { OfficeDTO } from '../office/types';

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: string;
  refreshTokenExpiresAt: string;
}

export type SignUpCompanyResponse = {
  company: CompanyDTO;
  office: OfficeDTO;
};
