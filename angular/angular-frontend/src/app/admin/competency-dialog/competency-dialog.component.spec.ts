import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetencyDialogComponent } from './competency-dialog.component';

describe('CompetencyDialogComponent', () => {
  let component: CompetencyDialogComponent;
  let fixture: ComponentFixture<CompetencyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetencyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetencyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
