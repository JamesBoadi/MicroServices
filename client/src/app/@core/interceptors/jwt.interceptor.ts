import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {

    const token = localStorage.getItem("user_token");

    if (token) {
      const cloned = request.clone({
        headers: request.headers.set("authorization", token)
      });
      
      return next.handle(cloned);
    }
    else {
      const cloned = request.clone({
        headers: request.headers.set("authorization", "none")
      });

      return next.handle(cloned);
    }
  }
}
