// src/app/admin/competency-dialog/competency-dialog.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompetencyDTO } from '../../models/competency-dto';
import { CompetencyService } from '../../services/competency.service';

@Component({
  selector: 'app-competency-dialog',
  templateUrl: './competency-dialog.component.html',
  styleUrls: ['./competency-dialog.component.css']
})
export class CompetencyDialogComponent implements OnInit {
  form: CompetencyDTO;

  constructor(
    public dialogRef: MatDialogRef<CompetencyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CompetencyDTO,
    private competencyService: CompetencyService
  ) {
    this.form = data || { name: '', description: '' };
  }

  ngOnInit(): void {}

  save() {
    if (!this.form.name) {
      alert('Название обязательно для заполнения');
      return;
    }

    const operation = this.form.id
      ? this.competencyService.update(this.form.id, this.form)
      : this.competencyService.create(this.form);

    operation.subscribe({
      next: () => this.dialogRef.close(),
      error: (err) => console.error('Ошибка сохранения:', err)
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
