import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serviceUrl } from '../config';
import { ApiResponse, Log } from '../types';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    url: string = serviceUrl;
    commands = {
        logs: '/api/employee/logs',
    };

    constructor(private http: HttpClient) { }

    getLogs(): Promise<Log[] | undefined> {
        return new Promise((resolve, reject) => {
            const req = this.http.get<ApiResponse>(this.url + this.commands.logs);
            req.subscribe({
                next: (v) => {
                    if (v.status == 'ok')
                        resolve(v.data);
                    else {
                        console.log(v);
                        resolve(undefined);
                    }
                },
                error: (e) => {
                    reject(e)
                }
            })
        })
    }

}
