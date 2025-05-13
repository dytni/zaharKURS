// src/app/admin/candidate-dialog/candidate-dialog.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CandidateDTO } from '../../models/candidate-dto';
import { CandidateService } from '../../services/candidate.service';
import { CompetencyService } from '../../services/competency.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-candidate-dialog',
  templateUrl: './candidate-dialog.component.html',
  styleUrls: ['./candidate-dialog.component.css']
})
export class CandidateDialogComponent implements OnInit {
  candidateForm: FormGroup;
  competencies: any[] = [];
  allCompetencies: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<CandidateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CandidateDTO,
    private candidateService: CandidateService,
    private competencyService: CompetencyService,
    private fb: FormBuilder
  ) {
    this.candidateForm = this.fb.group({
      id: [data?.id],
      fullName: [data?.fullName, Validators.required],
      email: [data?.email, [Validators.required, Validators.email]],
      phone: [data?.phone, Validators.required],
      resume: [data?.resume]
    });
  }

  ngOnInit(): void {
    this.competencyService.getAll().subscribe(
      (competencies) => (this.allCompetencies = competencies)
    );
  }

  addCompetency() {
    this.competencies.push({ competencyId: 0, level: 1 });
  }

  removeCompetency(index: number) {
    this.competencies.splice(index, 1);
  }

  save() {
    if (this.candidateForm.valid) {
      const candidateDTO = this.candidateForm.value;
      if (candidateDTO.id) {
        this.candidateService.update(candidateDTO.id, candidateDTO).subscribe(
          () => this.dialogRef.close(true),
          (error) => console.error('Ошибка:', error)
        );
      } else {
        this.candidateService.create(candidateDTO).subscribe(
          () => this.dialogRef.close(true),
          (error) => console.error('Ошибка:', error)
        );
      }
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
