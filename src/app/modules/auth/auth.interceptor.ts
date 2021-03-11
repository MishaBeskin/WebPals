import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
/**
 * skip Interceptor auth Header
 */
export const InterceptorSkip = 'X-Skip-Interceptor';
export const InterceptorSkipHeader = new HttpHeaders({
  'X-Skip-Interceptor': ''
});

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }


  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // if (req.headers.get('No-Auth') === 'True') {
    //   return next.handle(req.clone());
    // }

    if (req.headers && req.headers.has(InterceptorSkip)) {
      const headers = req.headers.delete(InterceptorSkip);
      return next.handle(req.clone({ headers }));
    }

    if (localStorage.getItem('userToken') != null) {
      const clonedreq = req.clone({
        headers: req.headers.set(
          'Authorization',
          'Bearer ' + localStorage.getItem('userToken')
        )
      });
      return next.handle(clonedreq).pipe(
        tap(
          succ => { },
          err => {
            if (err.status === 401) {
              // this.router.navigateByUrl('/login');
            } else if ((err.status = 403)) {
              // this.router.navigateByUrl('/forbidden');
              // alert(err.localStorage.getItem('userToken'));
            }
          }
        )
      );
    } else {
      this.router.navigateByUrl('/auth/login');
    }
  }
}
