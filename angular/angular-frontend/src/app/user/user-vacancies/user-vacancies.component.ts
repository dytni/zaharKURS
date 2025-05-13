// src/app/user/user-vacancies/user-vacancies.component.ts
import { Component, OnInit } from '@angular/core';
import { VacancyService } from '../../services/vacancy.service';
import { VacancyDTO } from '../../models/vacancy-dto';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-vacancies',
  templateUrl: './user-vacancies.component.html',
  styleUrls: ['./user-vacancies.component.css']
})
export class UserVacanciesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'department', 'actions'];
  dataSource = new MatTableDataSource<VacancyDTO>();

  constructor(private vacancyService: VacancyService) {}

  ngOnInit() {
    this.loadVacancies();
  }

  loadVacancies() {
    this.vacancyService.getAll().subscribe(
      (vacancies) => (this.dataSource.data = vacancies),
      (error) => alert('Ошибка при загрузке вакансий')
    );
  }

  applyToVacancy(vacancyId: number) {
    // Логика отправки заявки через ApplicationService
    console.log('Отклик на вакансию:', vacancyId);
  }
}
