// shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router'; // Для router-outlet
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; // Если есть формы

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule, // Для router-outlet
    MatCardModule, // Для карточек
    MatInputModule, // Для полей ввода
    MatButtonModule, // Для кнопок
    MatToolbarModule, // Для шапки
    ReactiveFormsModule,
    FormsModule,
    // Если нужны формы
  ],
  exports: [
    LoginComponent,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    ReactiveFormsModule,
    RouterModule // Если нужно экспортировать
  ]
})
export class SharedModule {}
