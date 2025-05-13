import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VacancyDTO } from '../../models/vacancy-dto';
import { VacancyService } from '../../services/vacancy.service';
import { CompetencyService } from '../../services/competency.service';
import { CompetencyDTO } from '../../models/competency-dto';

@Component({
  selector: 'app-vacancy-dialog',
  templateUrl: './vacancy-dialog.component.html',
  styleUrls: ['./vacancy-dialog.component.css']
})
export class VacancyDialogComponent implements OnInit {
  vacancyForm: VacancyDTO;
  allCompetencies: CompetencyDTO[] = [];

  constructor(
    public dialogRef: MatDialogRef<VacancyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VacancyDTO | null,
    private vacancyService: VacancyService,
    private competencyService: CompetencyService
  ) {
    this.vacancyForm = data || {
      title: '',
      description: '',
      department: '',
      status: 'DRAFT',
      requirements: []
    };
  }

  ngOnInit(): void {
    this.loadCompetencies();
  }

  compareCompetencies(c1: CompetencyDTO, c2: CompetencyDTO): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  private loadCompetencies(): void {
    this.competencyService.getAll().subscribe(
      (competencies) => this.allCompetencies = competencies,
      (error) => console.error('Ошибка загрузки компетенций:', error)
    );
  }

  addRequirement(): void {
    this.vacancyForm.requirements.push(null);
  }

  removeRequirement(index: number): void {
    this.vacancyForm.requirements.splice(index, 1);
  }

  save(): void {
    if (this.isFormValid()) {
      const operation = this.vacancyForm.id
        ? this.vacancyService.update(this.vacancyForm.id, this.vacancyForm)
        : this.vacancyService.create(this.vacancyForm);

      // @ts-ignore
      operation.subscribe({
        next: () => this.dialogRef.close(),
        error: (err) => console.error('Ошибка сохранения:', err)
      });
    }
  }

  private isFormValid(): boolean {
    if (!this.vacancyForm.title?.trim() || !this.vacancyForm.department?.trim()) {
      alert('Пожалуйста, заполните обязательные поля');
      return false;
    }

    if (this.vacancyForm.requirements?.some(r => !r?.id)) {
      alert('Все компетенции должны быть выбраны из списка');
      return false;
    }

    return true;
  }

  private handleSaveError(error: any): void {
    console.error('Ошибка сохранения:', error);
    alert('Произошла ошибка при сохранении. Подробности в консоли.');
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
