import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityService } from '../services/security.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    FirstName: new FormControl(''),
    LastName: new FormControl(''),
    Address: new FormControl(''),
    JobTitle: new FormControl(''),
    JobLevel: new FormControl(''),
    HourlyPay: new FormControl(''),
  });

  @Input() error: string | null | undefined;

    constructor(private secService: SecurityService, private router: Router) { }

    ngOnInit(): void {}

    register () {
      console.log("in register");
        if (this.form.valid) {
            console.log(this.form.value);
            this.secService.validate().then((result)=>{
                if (result){
                    this.router.navigate(['home'])
                } else{ }
            }).catch(e=>{
                console.error(e);
            });
        }
    }

}
