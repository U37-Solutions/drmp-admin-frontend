export interface FeedbackDTO {
  id: number;
  message: string;
  name?: string;
  email?: string;
  companyId: number | null;
  companyName: string | null;
}
