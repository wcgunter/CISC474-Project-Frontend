import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { serviceUrl } from '../config';
import { ApiResponse } from '../types';

@Injectable({
    providedIn: 'root'
})
export class SecurityService {
    url: string = serviceUrl;
    commands = {
        login: '/security/token',
        register: '/security/register',
        validateAdmin: '/security/validate/admin',
        validate: '/security/validate/'
    };
    get username(): string {
        const un = localStorage.getItem('user_name');
        return (un ? un : '');
    }
    set username(val: string) {
        localStorage.setItem('user_name', val);
    }
    get token(): string {
        const tkn = localStorage.getItem('sec_token');
        return (tkn ? tkn : '');
    }
    set token(val: string) {
        localStorage.setItem('sec_token', val);
        this.loginStatusChange.emit(this.loggedIn)
    }
    get loggedIn(): boolean {
        return this.token.length > 0;
    }

    loginStatusChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private http: HttpClient) { }

    login(un: string, pass: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const req = this.http.post<ApiResponse>(this.url + this.commands.login, { username: un, password: pass });
            req.subscribe({
                next: (v: ApiResponse) => {
                    if (v.status == 'ok') {
                        this.username = un;
                        this.token = (v.data as Record<string, string>)['token'];
                        resolve(true);
                    } else {
                        this.token = '';
                        resolve(false);
                    }
                },
                error: (e) => {
                    this.token = '';
                    console.error(e)
                    reject(e);
                }
            });
        })
    }

    logout() {
        this.token = '';
        this.username = '';
    }

    validateAdmin(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (!this.loggedIn) return resolve(false);
            const req = this.http.get<ApiResponse>(this.url + this.commands.validateAdmin);
            req.subscribe({
                next: (v) => {
                    const ok = v.status == 'ok';
                    resolve(ok);
                },
                error: (e) => {
                    reject(e)
                }
            })
        })
    }

    validate(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (!this.loggedIn) return resolve(false);
            const req = this.http.get<ApiResponse>(this.url + this.commands.validate);
            req.subscribe({
                next: (v) => {
                    const ok = v.status == 'ok';
                    if (!ok) this.token = '';
                    resolve(ok);
                },
                error: (e) => {
                    this.token = '';
                    reject(e)
                }
            })
        })
    }

    register(un: string, pass: string, fn: string, ln: string, add: string, job_title: string, job_level: string, pay_rate: number, admin: boolean): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const req = this.http.post<ApiResponse>(this.url + this.commands.register, { username: un, password: pass, first_name: fn, last_name: ln, address: add, job_title: job_title, job_level: job_level, pay_rate: pay_rate, is_admin: admin });
            req.subscribe({
                next: (v: ApiResponse) => {
                    if (v.status == 'ok') {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                },
                error: (e) => {
                    reject(e);
                    console.error(e)
                }
            });
        });
    }


}
