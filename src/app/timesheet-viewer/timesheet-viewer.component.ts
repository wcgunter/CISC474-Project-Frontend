import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDatetimepickerFilterType } from '@mat-datetimepicker/core';
import { Log, LogView } from '../types';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { SecurityService } from '../services/security.service';
import { TestService } from '../test.service';

@Component({
  selector: 'app-timesheet-viewer',
  templateUrl: './timesheet-viewer.component.html',
  styleUrls: ['./timesheet-viewer.component.scss']
})

export class TimesheetViewerComponent implements AfterViewInit {
  //Table variables & functions
  ELEMENT_DATA: LogView[] = [
    {position: 1, clockIn: '1/1/2020 8:00 AM', clockOut: '1/1/2020 5:00 PM', hoursWorked: 8, pay: 8},
  ];
  displayedColumns: string[] = ['position', 'clockIn', 'clockOut', 'hoursWorked', 'pay'];
  dataSource = new MatTableDataSource<LogView>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // Datepicker variables & functions
  startTimeGroup: FormGroup;
  endTimeGroup: FormGroup;
  today = new Date();
  tomorrow = new Date();
  min = new Date();
  max = new Date();
  start = new Date();
  filter: (date: Date, type: MatDatetimepickerFilterType) => boolean;

  get getStartTime():string{
    return this.startTimeGroup.controls['startInputBox'].value;
  }

  get getEndTime():string{
    return this.endTimeGroup.controls['endInputBox'].value;
  }

  constructor(fb: FormBuilder, public sharedSvc: TestService, private secService: SecurityService, private router: Router, private apiService: ApiService) { 
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
     startInputBox:[null,Validators.required]
    });

    this.endTimeGroup = fb.group({
      endInputBox:[null,Validators.required]
     });
  }

  // Function that gets called when the user clicks the search button
  // This function will call the API and get the logs between the two dates
  // Then it will calculate the pay for each log and display it in the table
  search(){
    console.log(this.getStartTime);
    console.log(this.getEndTime);
  }


  // Function that gets called when the user clicks the search button, this time with database functionality
  // This function will call the API and get the logs between the two dates
  searchAPI() {
    var startTime = new Date(this.getStartTime);
    var endTime = new Date(this.getEndTime);
    this.apiService.getTimesheets(startTime, endTime).then((timesheets) => {
      this.ELEMENT_DATA.splice(0, this.ELEMENT_DATA.length, ...timesheets);
    })
    this.dataSource.data = this.ELEMENT_DATA;
  } 

}
