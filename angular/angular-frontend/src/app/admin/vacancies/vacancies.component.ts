// src/app/admin/vacancies/vacancies.component.ts
import { Component, OnInit } from '@angular/core';
import { VacancyService } from '../../services/vacancy.service';
import { VacancyDTO } from '../../models/vacancy-dto';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { VacancyDialogComponent } from '../vacancy-dialog/vacancy-dialog.component';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.css']
})
export class VacanciesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'department', 'actions']; // Добавьте это
  dataSource = new MatTableDataSource<VacancyDTO>(); // И это

  constructor(
    private vacancyService: VacancyService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadVacancies();
  }

  loadVacancies() {
    this.vacancyService.getAll().subscribe(
      (data) => (this.dataSource.data = data),
      (error) => console.error('Ошибка:', error)
    );
  }

  // Метод для открытия диалога
  openDialog(vacancy?: VacancyDTO) {
    this.dialog.open(VacancyDialogComponent, {
      data: vacancy || { title: '', description: '', department: '', status: 'DRAFT' }
    });
  }
}
