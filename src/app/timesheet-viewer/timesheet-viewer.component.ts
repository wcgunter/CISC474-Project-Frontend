import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDatetimepickerFilterType } from '@mat-datetimepicker/core';

@Component({
  selector: 'app-timesheet-viewer',
  templateUrl: './timesheet-viewer.component.html',
  styleUrls: ['./timesheet-viewer.component.scss']
})

export class TimesheetViewerComponent implements OnInit {
  startTimeGroup: FormGroup;
  endTimeGroup: FormGroup;
  today = new Date();
  tomorrow = new Date();
  min = new Date();
  max = new Date();
  start = new Date();
  filter: (date: Date, type: MatDatetimepickerFilterType) => boolean;

  get getStartTime():string{
    return this.startTimeGroup.controls['inputbox'].value;
  }

  get getEndTime():string{
    return this.endTimeGroup.controls['inputbox'].value;
  }

  constructor(fb: FormBuilder) { 
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    this.min.setFullYear(2018, 10, 3);
    this.min.setHours(11);
    this.min.setMinutes(10);
    this.max.setFullYear(2020, 10, 3);
    this.max.setHours(11);
    this.max.setMinutes(45);
    this.start.setFullYear(1930, 9, 28);

    this.filter = (date: Date, type: MatDatetimepickerFilterType) => {
      switch (type) {
        case MatDatetimepickerFilterType.DATE:
          return (
            date.getUTCFullYear() % 2 === 0 &&
            date.getMonth() % 2 === 0 &&
            date.getDate() % 2 === 0
          );
        case MatDatetimepickerFilterType.HOUR:
          return date.getHours() % 2 === 0;
        case MatDatetimepickerFilterType.MINUTE:
          return date.getMinutes() % 2 === 0;
      }
    };

    this.startTimeGroup = fb.group({
     inputbox:[null,Validators.required]
    });

    this.endTimeGroup = fb.group({
      inputbox:[null,Validators.required]
     });
  }
  ngOnInit(): void {
    
  }

}