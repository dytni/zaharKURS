// src/app/admin/candidates/candidates.component.ts
import {Component, OnInit, ViewChild} from '@angular/core';
import { CandidateService } from '../../services/candidate.service';
import { CandidateDTO } from '../../models/candidate-dto';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CandidateDialogComponent } from '../candidate-dialog/candidate-dialog.component';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fullName', 'email', 'actions'];
  dataSource = new MatTableDataSource<CandidateDTO>();

  constructor(
    private candidateService: CandidateService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCandidates();
  }

  loadCandidates() {
    this.candidateService.getAll().subscribe(
      (candidates) => (this.dataSource.data = candidates),
      (error) => console.error('Ошибка:', error)
    );
  }

  openDialog(candidate?: CandidateDTO) {
    const dialogRef = this.dialog.open(CandidateDialogComponent, {
      data: candidate || { fullName: '', email: '', phone: '' }
    });

    dialogRef.afterClosed().subscribe(() => this.loadCandidates());
  }
  // candidates.component.ts
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  editCandidate(candidate: CandidateDTO) {
    this.openDialog(candidate);
  }

  deleteCandidate(id: number) {
    if (confirm('Удалить кандидата?')) {
      this.candidateService.delete(id).subscribe(() => this.loadCandidates());
    }
  }
}
