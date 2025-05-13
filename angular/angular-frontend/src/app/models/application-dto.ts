export interface ApplicationDTO {
  id?: number;
  candidateId: number;
  vacancyId: number;
  status: string;
  totalScore: number;
  applicationDate: Date;
}
