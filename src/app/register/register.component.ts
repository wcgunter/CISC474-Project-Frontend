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
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    address: new FormControl(''),
    job_title: new FormControl(''),
    job_level: new FormControl(''),
    pay_rate: new FormControl(''),
    admin: new FormControl(false),
  });

  @Input() error: string | null | undefined;

    constructor(private secService: SecurityService, private router: Router) { }

    ngOnInit(): void {}

    register () {
        if (this.form.valid) {
            this.secService.register(this.form.value.username, this.form.value.password, this.form.value.first_name, this.form.value.last_name, this.form.value.address, this.form.value.job_title, this.form.value.job_level, Number(this.form.value.pay_rate), (this.form.value.admin === 'true')).then((result)=>{
                if (result){
                    window.alert("New user created successfully!")
                    this.router.navigate(['home'])
                } else{ }
            }).catch(e=>{
                console.error(e);
            });
        }
    }

}
