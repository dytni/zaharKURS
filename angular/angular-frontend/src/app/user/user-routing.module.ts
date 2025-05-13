// src/app/user/user-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ApplicationsComponent } from './applications/applications.component';
import { UserVacanciesComponent } from './user-vacancies/user-vacancies.component';

const routes: Routes = [
  { path: '', component: UserDashboardComponent },
  { path: 'applications', component: ApplicationsComponent },
  { path: 'vacancies', component: UserVacanciesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
