// services/vacancy.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VacancyDTO } from '../models/vacancy-dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VacancyService {
  private apiUrl = environment.apiUrl + '/vacancies';

  constructor(private http: HttpClient) {}

  // Создание вакансии
  create(vacancy: VacancyDTO): Observable<VacancyDTO> {
    return this.http.post<VacancyDTO>(this.apiUrl, vacancy);
  }

  // Обновление вакансии
  update(id: number, vacancy: VacancyDTO): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, vacancy);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Получение всех вакансий
  getAll(): Observable<VacancyDTO[]> {
    return this.http.get<VacancyDTO[]>(this.apiUrl);
  }
}
