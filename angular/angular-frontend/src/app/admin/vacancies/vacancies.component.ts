// src/app/admin/vacancies/vacancies.component.ts
import { Component, OnInit } from '@angular/core';
import { VacancyService } from '../../services/vacancy.service';
import { VacancyDTO } from '../../models/vacancy-dto';
import { MatDialog } from '@angular/material/dialog';
import { VacancyDialogComponent } from '../vacancy-dialog/vacancy-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.css']
})
export class VacanciesComponent implements OnInit {
  vacancies: VacancyDTO[] = [];

  constructor(
    private vacancyService: VacancyService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadVacancies();
  }

  loadVacancies() {
    this.vacancyService.getAll().subscribe(
      (data) => {
        this.vacancies = data;
        console.log('Полученные вакансии:', data);
      },
      (error) => {
        console.error('Ошибка:', error);
        this.snackBar.open('Не удалось загрузить вакансии', 'Закрыть', { duration: 3000 });
      }
    );
  }

  openDialog(vacancy?: VacancyDTO) {
    const dialogRef = this.dialog.open(VacancyDialogComponent, {
      data: vacancy || { title: '', description: '', department: '', status: 'DRAFT' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadVacancies();
      }
    });
  }

  editVacancy(vacancy: VacancyDTO) {
    this.openDialog(vacancy);
  }

  deleteVacancy(id: number) {
    if (confirm('Удалить вакансию?')) {
      this.vacancyService.delete(id).subscribe(
        () => {
          this.loadVacancies();
          this.snackBar.open('Вакансия удалена', 'Закрыть', { duration: 3000 });
        },
        (error) => {
          console.error('Ошибка:', error);
          this.snackBar.open('Не удалось удалить вакансию', 'Закрыть', { duration: 3000 });
        }
      );
    }
  }
}
