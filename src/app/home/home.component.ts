import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from '../services/security.service';
import { TestService } from '../test.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public sharedSvc:TestService, private secService: SecurityService, private router: Router) { }

  ngOnInit(): void {
    if (!this.secService.loggedIn) this.router.navigate(['/login']);
  }

  onClick() {
    this.sharedSvc.sharedValue++;
  }

}
