import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Добавьте этот импорт
import { BehaviorSubject, Observable } from 'rxjs';
import { UserDTO } from '../models/user-dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  currentUserSubject = new BehaviorSubject<UserDTO | null>(null); // Добавьте 'private'

  constructor(
    private http: HttpClient,
    private router: Router // Добавьте Router в конструктор
  ) {}

  login(username: string, password: string): Observable<UserDTO> {
    const requestBody = {
      username: username,
      password: password
    };

    return this.http.post<UserDTO>(this.apiUrl + '/login', requestBody); // Используем POST
  }

  setCurrentUser(user: UserDTO | null) {
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): Observable<UserDTO | null> {
    return this.currentUserSubject.asObservable();
  }

  getRoles(): string[] | null {
    const user = this.currentUserSubject.value;
    return user ? user.roles : null;
  }

  logout() {
    this.setCurrentUser(null);
    this.router.navigate(['/login']); // Теперь router доступен
  }
}
