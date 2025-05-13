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

@NgModule({
  declarations: [
    CandidatesComponent,
    VacanciesComponent,
    CompetenciesComponent,
    CandidateDialogComponent,
    VacancyDialogComponent,
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
    FormsModule
  ]
})
export class AdminModule {}
