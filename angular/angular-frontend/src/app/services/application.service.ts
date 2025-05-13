// services/application.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationDTO } from '../models/application-dto';
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private apiUrl = environment.apiUrl + '/applications';

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  getAll(): Observable<ApplicationDTO[]> {
    return this.http.get<ApplicationDTO[]>(this.apiUrl).pipe(
      catchError(error => {
        this.snackBar.open('Ошибка при загрузке заявок', 'Закрыть', { duration: 3000 });
        throw error;
      })
    );
  }
  // Метод для получения заявок текущего пользователя
  getMyApplications(): Observable<ApplicationDTO[]> {
    return this.http.get<ApplicationDTO[]>(`${this.apiUrl}/my`);
  }

  apply(candidateId: number, vacancyId: number): Observable<ApplicationDTO> {
    return this.http.post<ApplicationDTO>(this.apiUrl, { candidateId, vacancyId });
  }

  updateStatus(id: number, newStatus: string): Observable<ApplicationDTO> {
    return this.http.put<ApplicationDTO>(`${this.apiUrl}/${id}/status`, { newStatus });
  }

  deleteApplication(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getApplicationsByCandidate(candidateId: number): Observable<ApplicationDTO[]> {
    return this.http.get<ApplicationDTO[]>(`${this.apiUrl}/candidate/${candidateId}`);
  }

  getApplicationsByVacancy(vacancyId: number): Observable<ApplicationDTO[]> {
    return this.http.get<ApplicationDTO[]>(`${this.apiUrl}/vacancy/${vacancyId}`);
  }
}
