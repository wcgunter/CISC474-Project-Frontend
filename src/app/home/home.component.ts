import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { SecurityService } from '../services/security.service';
import { TestService } from '../test.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  startDate: Date = new Date();
  endDate: Date = new Date();

  constructor(public sharedSvc: TestService, private secService: SecurityService, private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    this.secService.validate().then((result)=>{
      if (!result) this.router.navigate(['/login']);
    });
  }

  onClick() {
    this.sharedSvc.sharedValue++;
  }

  getLogs() {
    this.apiService.getLogs().then((logs) => {
      console.log(logs);
    });
    this.router.navigate([`/timesheet-viewer`]);
  }

  clock() {
    this.router.navigate([`/clock`]);
  }

  // TEMPORARY FUNCTION
  pay() {
    this.apiService.getPay(this.startDate, this.endDate).then((result) => {
      if (result)
        console.log(result);
    })
  }

  createNewUser() {
    this.secService.validateAdmin().then((result) => {
      if (result) {
        this.router.navigate(['register'])
      } else { window.alert("You don't have access to this page.") }
    }).catch(e => {
      console.error(e);
    });
  }
}
