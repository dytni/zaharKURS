// src/app/admin/candidate-dialog/candidate-dialog.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CandidateDTO } from '../../models/candidate-dto';
import { CandidateService } from '../../services/candidate.service';
import { CompetencyService } from '../../services/competency.service';

@Component({
  selector: 'app-candidate-dialog',
  templateUrl: './candidate-dialog.component.html',
  styleUrls: ['./candidate-dialog.component.css']
})
export class CandidateDialogComponent implements OnInit {
  candidateForm: CandidateDTO;
  competencies: any[] = []; // Объявите competencies
  allCompetencies: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<CandidateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CandidateDTO,
    private candidateService: CandidateService,
    private competencyService: CompetencyService
  ) {
    this.candidateForm = data;
  }

  ngOnInit(): void {
    this.competencyService.getAll().subscribe(
      (competencies) => (this.allCompetencies = competencies)
    );
  }

  // Добавьте методы
  addCompetency() {
    this.competencies.push({ competencyId: 0, level: 1 });
  }

  removeCompetency(index: number) {
    this.competencies.splice(index, 1);
  }

  save() {
    // Логика сохранения
  }

  onCancel() {
    this.dialogRef.close();
  }
}
