import {CompetencyDTO} from "./competency-dto";

export interface CandidateDTO {
  id?: number;
  fullName: string;
  email: string;
  phone: string;
  resume: string;
  competencies?: CompetencyDTO[];
}
