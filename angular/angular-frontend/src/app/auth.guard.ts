// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const allowedRoles = route.data['allowedRoles'] as string[];

    return this.auth.getCurrentUser().pipe(
      map(user => {
        if (user && user.roles.some(role => allowedRoles.includes(role))) {
          return true;
        }
        this.router.navigate(['/login']);
        return false;
      })
    );
  }
}
