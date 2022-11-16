import { Component, OnInit } from '@angular/core';
import { ApiService} from '../services/api.service';
import { v4 as uuid} from 'uuid';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {

  dateTime: Date = new Date()

  constructor(private apiService: ApiService, private cookieService : CookieService) { }

  ngOnInit(): void {
    setInterval(() => {
      this.dateTime = new Date()
    }, 1000)
  }

  postClockEvent(isClockIn: boolean) {
    isClockIn ? this.cookieService.set('clock-id', uuid()) : ''
    let clockID: string = this.cookieService.get('clock-id')
    if (clockID){
      this.apiService.clockEvent(new Date(), clockID, isClockIn ? 'in' : 'yes').then(() => {
        
      })
    }
  }

  
}
