import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(public sharedSvc:TestService, private router: Router) { }

  ngOnInit(): void {
  }

  navigate(page: string){
    this.router.navigate([`/${page}`]);
  }
}
