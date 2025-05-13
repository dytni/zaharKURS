// services/competency.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompetencyDTO } from '../models/competency-dto';
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CompetencyService {
  private apiUrl = environment.apiUrl + '/competencies';

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  getAll(): Observable<CompetencyDTO[]> {
    return this.http.get<CompetencyDTO[]>(this.apiUrl).pipe(
      catchError(error => {
        this.snackBar.open('Ошибка при загрузке компетенций', 'Закрыть', { duration: 3000 });
        throw error;
      })
    );
  }

  create(competency: CompetencyDTO): Observable<CompetencyDTO> {
    return this.http.post<CompetencyDTO>(this.apiUrl, competency);
  }

  update(id: number, competency: CompetencyDTO): Observable<CompetencyDTO> {
    return this.http.put<CompetencyDTO>(`${this.apiUrl}/${id}`, competency);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
