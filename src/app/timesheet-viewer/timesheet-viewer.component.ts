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
  group: FormGroup;
  today = new Date();
  tomorrow = new Date();
  min = new Date();
  max = new Date();
  start = new Date();
  filter: (date: Date, type: MatDatetimepickerFilterType) => boolean;

  get selecteTime():string{
    return this.group.controls['inputbox'].value;
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

    this.group = fb.group({
      /*
      dateTime: [new Date('2017-11-09T12:10:00.000Z'), Validators.required],
      dateTimeYear: [new Date('2017-11-09T12:10:00.000Z'), Validators.required],
      date: [null, Validators.required],
      time: [null, Validators.required],
      timeAMPM: [null, Validators.required],
      month: [null, Validators.required],
      year: [null, Validators.required],
      mintest: [this.today, Validators.required],
      filtertest: [this.today, Validators.required],
      touch: [null, Validators.required],
      preventsame: [new Date('2020-11-19T17:00:00.000Z'), Validators.required],
      */
     inputbox:[null,Validators.required]
    });
  }
  ngOnInit(): void {
    
  }
  test():void{
    console.log(this.selecteTime)
  }
}