import { Component, OnInit } from '@angular/core';
import { ApiService} from '../services/api.service';
import { v4 as uuid} from 'uuid';
import {CookieService} from 'ngx-cookie-service';
import { SecurityService } from '../services/security.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {

  dateTime: Date = new Date()
  clocking: string = this.cookieService.get('clock-id') ? 'out' : 'in'

  constructor(private apiService: ApiService, private cookieService : CookieService, private secService: SecurityService, private router: Router) { }

  ngOnInit(): void {
    this.secService.validate().then((result)=>{
      if (!result) this.router.navigate(['/login']);
    });

    setInterval(() => {
      this.dateTime = new Date()
    }, 1000)
  }

  postClockEvent() {
    if (this.clocking == 'in'){
      this.cookieService.set('clock-id', uuid())
    }
    let clockID: string = this.cookieService.get('clock-id')
    if (clockID){
      this.apiService.clockEvent(this.dateTime, clockID, this.clocking).then((result) => {
        if (result){
          if (this.clocking == 'in') {
            this.clocking ='out';
          }else {
            this.cookieService.delete('clock-id')
            this.clocking = 'in';
          }
        }
        else{ 
          this.cookieService.delete('clock-id');
        }
      })
      .catch(()=> {
        (this.clocking == 'in') ? this.cookieService.delete('clock-id') : ''
      })
    }
  }

  
}
