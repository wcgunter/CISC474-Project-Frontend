import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { SecurityService } from '../services/security.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  
  constructor(private router: Router, private secService: SecurityService) { }

  ngOnInit(): void {
  }

  navigate(page: string){
    this.router.navigate([`/${page}`]);

  }

  logout(){
    this.secService.logout();
    this.router.navigate([`/login`]);

  }

}
