import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { SecurityService } from './security.service';

/** Adds the token to the authorization header for all http requests. */
@Injectable()
export class SecurityHttpInterceptor implements HttpInterceptor {
    constructor(private secSvc: SecurityService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.secSvc.token;
        const newReq = req.clone({
            headers: req.headers.set('Authorization', 'bearer ' + this.secSvc.token)
        });
        return next.handle(newReq);
    }
}
