import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { ApplicationDTO } from '../../models/application-dto';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {
  applications: ApplicationDTO[] = [];

  constructor(private appService: ApplicationService) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications() {
    this.appService.getMyApplications().subscribe(
      (data) => {
        this.applications = data;
      },
      (error) => console.error('Ошибка:', error)
    );
  }
}
