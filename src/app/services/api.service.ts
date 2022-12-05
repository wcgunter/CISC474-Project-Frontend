import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serviceUrl } from '../config';
import { ApiResponse, Log, LogView, PayResult } from '../types';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    url: string = serviceUrl;
    commands = {
        logs: '/api/employee/logs',
        clock: '/api/clock',
        pay: '/api/employee/pay',
        timesheet: '/api/employee/timesheet',
        employees: '/api/employees',
        firstName: '/api/employee/about/firstName'
    };

    constructor(private http: HttpClient) { }

    getFirstName(): Promise<string | undefined> {
        return new Promise((resolve, reject) => {
            const req = this.http.get<ApiResponse>(this.url + this.commands.firstName);
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

    getPay(startDate: Date, endDate: Date): Promise<PayResult | undefined> {
        return new Promise((resolve, reject) => {
            const req = this.http.get<ApiResponse>(this.url + this.commands.pay + `/${startDate.getTime()}/${endDate.getTime()}`);
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


    getTimesheets(startDate: Date, endDate: Date): Promise<LogView[]> {
        return new Promise((resolve, reject) => {
            const req = this.http.get<ApiResponse>(this.url + this.commands.timesheet + `/${startDate.getTime()}/${endDate.getTime()}`);
            req.subscribe({
                next: (v) => {
                    if (v.status == 'ok')
                        resolve(v.data);
                    else {
                        console.log(v);
                    }
                },
                error: (e) => {
                    reject(e)
                }
            })
        })
    }

    //
    getEmployees(): Promise<any> {
        return new Promise((resolve, reject) => {
            const req = this.http.get<ApiResponse>(this.url + this.commands.employees);
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


    // calls post clock endpoint with an in our out clock event - returns promise<boolean> true if successful, false if failed
    clockEvent(clockTime: Date, clockId: string, clockEvent: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const req = this.http.post<ApiResponse>(this.url + this.commands.clock, 
                {clock_time: clockTime.toISOString(), clock_id: clockId, clock_event: clockEvent});
            req.subscribe({
                next: (v) => {
                    if (v.status == 'ok')
                        resolve(true);
                    else {
                        console.log(v);
                        resolve(false);
                    }
                },
                error: (e) => {
                    reject(e)
                }
            })
        })
    }

    // calls put clock endpoint with a full clock event - returns promise<boolean> true if successful, false if failed
    updateClockEvent(clockInTime: Date, clockOutTime: Date, clockId: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const req = this.http.put<ApiResponse>(this.url + this.commands.clock, 
                {clock_in_time: clockInTime.toISOString(), clock_out_time: clockOutTime.toISOString(), clock_id: clockId});
            req.subscribe({
                next: (v) => {
                    if (v.status == 'ok')
                        resolve(true);
                    else {
                        console.log(v);
                        resolve(false);
                    }
                },
                error: (e) => {
                    reject(e)
                }
            })
        })
    }

    // calls delete clock endpoint with a clock id - returns promise<boolean> true if successful, false if failed
    deleteClockEvent(clockId: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const req = this.http.delete<ApiResponse>(this.url + this.commands.clock, {"body": {clock_id: clockId}});
            req.subscribe({
                next: (v) => {
                    if (v.status == 'ok')
                        resolve(true);
                    else {
                        console.log(v);
                        resolve(false);
                    }
                },
                error: (e) => {
                    reject(e)
                }
            })
        })
    }

}
