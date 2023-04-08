import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { SweetAlertService } from '../services/sweet-alert.service';

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {
  constructor(private router: Router, private sweetAlert: SweetAlertService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((ev: HttpEvent<any>) => {
        if (ev instanceof HttpResponse) {
          if (request.method != 'GET') {
            if (ev.body?.msg) {
              //this.notifier(ev.body?.msg);
            } else if (ev.body?.error) {
              //this.notifier(ev.body?.error, 'error');
            } else {
              //this.notifier('Success !!!');
            }
          }
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.errorHandler(error);
        return throwError(error);
      })
    );
  }
  private errorHandler(error: any, type: string = 'error') {
    error.error.status_code = +error.error?.status_code;
    switch (error.status) {
      case 401: {
        //this.notifier(error.error.error, type);
        this.sweetAlert.errorToast(error.error.error, 2000);
        localStorage.clear();
        this.router.navigateByUrl('/login');
        break;
      }
      case 400: {
        this.sweetAlert.errorToast(error.error.error, 2000);
        break;
      }
      case 404: {
        this.sweetAlert.errorToast(error.error.error, 2000);
        break;
      }
      case 500: {
        this.sweetAlert.errorToast(error.error.error, 2000);
        break;
      }
      case 0: {
        this.sweetAlert.errorToast(
          'Seems there is some problem with the server. Try later!',
          2000
        );
        break;
      }
    }
  }
}
