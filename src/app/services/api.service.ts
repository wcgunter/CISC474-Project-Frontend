import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serviceUrl } from '../config';
import { ApiResponse } from '../types';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    url: string = serviceUrl;
    commands = {
        logs: '/api/employee/logs',
    };

    constructor(private http: HttpClient) { }

    getLogs(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const req = this.http.get<ApiResponse>(this.url + this.commands.logs);
            req.subscribe({
                next: (v) => {
                    resolve(true);
                },
                error: (e) => {
                    reject(e)
                }
            })
        })
    }

}
