import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.errorMessage = '';
    this.auth.login(this.username, this.password).subscribe({
      next: (user) => {
        ;
        this.auth.setCurrentUser(user);
        if (user.roles.includes('ADMIN')) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user']);
        }
      },
      error: (error) => {
        this.errorMessage = 'Неверный логин или пароль';
        console.error('Login failed:', error);
      }
    });
  }
}
