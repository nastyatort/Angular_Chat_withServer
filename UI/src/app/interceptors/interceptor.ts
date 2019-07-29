import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class InterceptorOne implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    document.getElementById('load__wrapper').classList.add("show")
    return next.handle(req).pipe(
    finalize(() => document.getElementById('load__wrapper').classList.remove("show"))
    )
  }
}
