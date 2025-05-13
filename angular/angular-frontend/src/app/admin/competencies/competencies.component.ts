// src/app/admin/competencies/competencies.component.ts
import { Component, OnInit } from '@angular/core';
import { CompetencyService } from '../../services/competency.service';
import { CompetencyDTO } from '../../models/competency-dto';
import { MatDialog } from '@angular/material/dialog';
import { CompetencyDialogComponent } from '../competency-dialog/competency-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-competencies',
  templateUrl: './competencies.component.html',
  styleUrls: ['./competencies.component.css']
})
export class CompetenciesComponent implements OnInit {
  competencies: CompetencyDTO[] = [];

  constructor(
    private competencyService: CompetencyService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCompetencies();
  }

  loadCompetencies() {
    this.competencyService.getAll().subscribe(
      (data) => {
        this.competencies = data;
        console.log('Полученные компетенции:', data);
      },
      (error) => {
        console.error('Ошибка:', error);
        this.snackBar.open('Не удалось загрузить компетенции', 'Закрыть', { duration: 3000 });
      }
    );
  }

  openDialog(competency?: CompetencyDTO) {
    const dialogRef = this.dialog.open(CompetencyDialogComponent, {
      data: competency || { name: '', description: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCompetencies();
      }
    });
  }

  deleteCompetency(id: number) {
    if (confirm('Удалить компетенцию?')) {
      this.competencyService.delete(id).subscribe(
        () => {
          this.loadCompetencies();
          this.snackBar.open('Компетенция удалена', 'Закрыть', { duration: 3000 });
        },
        (error) => {
          console.error('Ошибка:', error);
          this.snackBar.open('Не удалось удалить компетенцию', 'Закрыть', { duration: 3000 });
        }
      );
    }
  }
}
