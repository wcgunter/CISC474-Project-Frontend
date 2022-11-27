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
        if (!this.secService.loggedIn) this.router.navigate(['/login']);
    }

    onClick() {
        this.sharedSvc.sharedValue++;
    }

    getLogs() {
        this.apiService.getLogs().then((logs) => {
            console.log(logs);
        })
    }

    // TEMPORARY FUNCTION --> CLOCKS IN CLOCK_ID 0
    clockIn(){
        // TODO: generate a random clock id for new clock in event
        this.apiService.clockEvent(new Date(), "0", 'in').then((success) => {
            console.log(success);
            window.alert("Clocked In Successfully.")
        })
    }

    // TEMPORARY FUNCTION --> CLOCKS OUT CLOCK_ID 0
    clockOut(){
        // TODO: find a way to store clock id for a clock in, and pull that clock id when clocking out
        this.apiService.clockEvent(new Date(), "0", 'out').then((success) => {
            console.log(success);
            window.alert("Clocked Out Successfully.")
        })
    }

    // TEMPORARY FUNCTION
    pay(){
        this.apiService.getPay(this.startDate, this.endDate).then((result)=>{
            if (result)
                console.log(result);
        })
    }

    createNewUser(){
      this.router.navigate(['register'])
    }
}
