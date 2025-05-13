// src/app/admin/admin.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { CandidatesComponent } from './candidates/candidates.component';
import { VacanciesComponent } from './vacancies/vacancies.component';
import { CompetenciesComponent } from './competencies/competencies.component';
import { CandidateDialogComponent } from './candidate-dialog/candidate-dialog.component';
import { VacancyDialogComponent } from './vacancy-dialog/vacancy-dialog.component';
import { CompetencyDialogComponent } from './competency-dialog/competency-dialog.component';

// Material модули
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {AdminComponent} from "./admin.component";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";

@NgModule({
  declarations: [
    CandidatesComponent,
    VacanciesComponent,
    CompetenciesComponent,
    CandidateDialogComponent,
    VacancyDialogComponent,
    AdminComponent,
    AdminDashboardComponent,
    CompetencyDialogComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    SharedModule,
    FormsModule,
    MatSelectModule,
    MatSidenavModule,
    MatListModule
  ]
})
export class AdminModule {}
