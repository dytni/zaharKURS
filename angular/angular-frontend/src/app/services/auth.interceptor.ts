// services/auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const user = this.auth.currentUserSubject.value;
    if (user) {
      const headers = req.headers.set('Authorization', 'Basic ' + btoa(user.username + ':' + 'your_password'));
      const clonedRequest = req.clone({ headers });
      return next.handle(clonedRequest);
    }
    return next.handle(req);
  }
}
