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
  form: CompetencyDTO; // Объявите это свойство

  constructor(
    public dialogRef: MatDialogRef<CompetencyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CompetencyDTO,
    private competencyService: CompetencyService
  ) {
    this.form = data || { name: '' };
  }

  ngOnInit(): void {}

  save() {
    if (this.form.id) {
      this.competencyService.update(this.form.id, this.form).subscribe(() => this.dialogRef.close());
    } else {
      this.competencyService.create(this.form).subscribe(() => this.dialogRef.close());
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
