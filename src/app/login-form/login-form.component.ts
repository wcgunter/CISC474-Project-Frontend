import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityService } from '../services/security.service';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

    form: FormGroup = new FormGroup({
        username: new FormControl(''),
        password: new FormControl(''),
    });

    @Input() error: string | null | undefined;

    constructor(private secService: SecurityService, private router: Router) { }

    ngOnInit(): void {}

    submit() {
        if (this.form.valid) {
            console.log(this.form.value);
            this.secService.login(this.form.value.username, this.form.value.password).then((result)=>{
                if (result){
                    this.router.navigate(['home'])
                } else{ }
            }).catch(e=>{
                console.error(e);
            });
        }
    }

}
