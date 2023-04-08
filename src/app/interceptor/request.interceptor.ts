import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigManagerService } from '../services/config-manager.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private configManager: ConfigManagerService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const tokenCondition = localStorage.getItem('token')
      ? localStorage.getItem('token')
      : '';
    if (request.url.indexOf('assets/config/config.json') === -1) {
      request = request.clone({
        setHeaders: {
          'X-API-KEY': this.configManager.config.X_API_KEY,
          Authorization: tokenCondition || '',
        },
      });
    }
    return next.handle(request);
  }
}
