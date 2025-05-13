import {CompetencyDTO} from "./competency-dto";

export interface VacancyDTO {
  id?: number;
  title: string;
  description: string;
  department: string;
  status: string;
  requirements?: CompetencyDTO[];
}
