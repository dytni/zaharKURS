// src/app/admin/competencies/competencies.component.ts
import { Component, OnInit } from '@angular/core';
import { CompetencyService } from '../../services/competency.service';
import { CompetencyDTO } from '../../models/competency-dto';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { CompetencyDialogComponent } from '../competency-dialog/competency-dialog.component';

@Component({
  selector: 'app-competencies',
  templateUrl: './competencies.component.html',
  styleUrls: ['./competencies.component.css']
})
export class CompetenciesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'actions']; // Добавьте это
  dataSource = new MatTableDataSource<CompetencyDTO>(); // И это

  constructor(
    private competencyService: CompetencyService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCompetencies();
  }

  loadCompetencies() {
    this.competencyService.getAll().subscribe(
      (data) => (this.dataSource.data = data),
      (error) => console.error('Ошибка:', error)
    );
  }

  openDialog(competency?: CompetencyDTO) {
    this.dialog.open(CompetencyDialogComponent, { data: competency });
  }
}
