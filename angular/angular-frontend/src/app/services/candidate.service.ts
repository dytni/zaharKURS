import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CandidateDTO } from '../models/candidate-dto';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private apiUrl = environment.apiUrl + '/candidates';

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  getAll(): Observable<CandidateDTO[]> {
    return this.http.get<CandidateDTO[]>(this.apiUrl, { withCredentials: true }).pipe(
      catchError(error => {
        console.error('Ошибка:', error);
        return of([]);
      })
    );
  }

  create(candidate: CandidateDTO): Observable<CandidateDTO> {
    return this.http.post<CandidateDTO>(this.apiUrl, candidate, { withCredentials: true });
  }

  update(id: number, candidate: CandidateDTO): Observable<CandidateDTO> {
    return this.http.put<CandidateDTO>(`${this.apiUrl}/${id}`, candidate, { withCredentials: true });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  setCompetencies(candidateId: number, competencies: any[]): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${candidateId}/competencies`, competencies, { withCredentials: true });
  }
}
