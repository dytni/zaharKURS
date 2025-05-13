// src/app/admin/candidates/candidates.component.ts
import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../../services/candidate.service';
import { CandidateDTO } from '../../models/candidate-dto';
import { MatDialog } from '@angular/material/dialog';
import { CandidateDialogComponent } from '../candidate-dialog/candidate-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {
  candidates: CandidateDTO[] = [];

  constructor(
    private candidateService: CandidateService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCandidates();
  }

  loadCandidates() {
    this.candidateService.getAll().subscribe(
      (data) => {
        this.candidates = data;
        console.log('Полученные кандидаты:', data);
      },
      (error) => {
        console.error('Ошибка:', error);
        this.snackBar.open('Не удалось загрузить кандидатов', 'Закрыть', { duration: 3000 });
      }
    );
  }

  openDialog(candidate?: CandidateDTO) {
    const dialogRef = this.dialog.open(CandidateDialogComponent, {
      data: candidate || { fullName: '', email: '', phone: '', resume: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCandidates();
      }
    });
  }

  editCandidate(candidate: CandidateDTO) {
    this.openDialog(candidate);
  }

  deleteCandidate(id: number) {
    if (confirm('Удалить кандидата?')) {
      this.candidateService.delete(id).subscribe(
        () => {
          this.loadCandidates();
          this.snackBar.open('Кандидат удален', 'Закрыть', { duration: 3000 });
        },
        (error) => {
          console.error('Ошибка:', error);
          this.snackBar.open('Не удалось удалить кандидата', 'Закрыть', { duration: 3000 });
        }
      );
    }
  }
}
