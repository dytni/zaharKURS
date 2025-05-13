// src/app/admin/vacancy-dialog/vacancy-dialog.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VacancyDTO } from '../../models/vacancy-dto';
import { VacancyService } from '../../services/vacancy.service';
import { CompetencyService } from '../../services/competency.service';

@Component({
  selector: 'app-vacancy-dialog',
  templateUrl: './vacancy-dialog.component.html',
  styleUrls: ['./vacancy-dialog.component.css']
})
export class VacancyDialogComponent implements OnInit {
  vacancyForm: VacancyDTO; // Объявите это свойство
  requirements: any[] = []; // И это
  allCompetencies: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<VacancyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VacancyDTO | null,
    private vacancyService: VacancyService,
    private competencyService: CompetencyService
  ) {
    // Инициализация по умолчанию
    this.vacancyForm = data || {
      title: '',
      description: '',
      department: '',
      status: 'DRAFT'
    };
  }

  ngOnInit(): void {
    this.competencyService.getAll().subscribe(
      (competencies) => (this.allCompetencies = competencies)
    );
  }

  addRequirement() {
    this.requirements.push({ competencyId: 0, level: 1 });
  }

  save() {
    if (this.vacancyForm.id) {
      this.vacancyService.update(
        this.vacancyForm.id,
        this.vacancyForm
      ).subscribe(() => this.dialogRef.close());
    } else {
      this.vacancyService.create(this.vacancyForm).subscribe(() => this.dialogRef.close());
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
