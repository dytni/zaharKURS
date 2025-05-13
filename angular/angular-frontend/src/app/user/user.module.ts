// user/user.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ApplicationsComponent } from './applications/applications.component';
import { UserVacanciesComponent } from './user-vacancies/user-vacancies.component';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon"; // Добавьте импорт

@NgModule({
  declarations: [
    UserDashboardComponent,
    ApplicationsComponent,
    UserVacanciesComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    // Добавьте сюда
  ]
})
export class UserModule {}
