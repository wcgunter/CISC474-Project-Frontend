import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetViewerComponent } from './timesheet-viewer.component';

describe('TimesheetViewerComponent', () => {
  let component: TimesheetViewerComponent;
  let fixture: ComponentFixture<TimesheetViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimesheetViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimesheetViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
