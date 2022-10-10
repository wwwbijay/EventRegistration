import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private _auth: AuthService, private _router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = request;
    const token = this._auth.GetAccessToken();

    if(request.url.includes('/api/auth/token')){
      return next.handle(request);
    }

    if (token != null) {
      authReq = this.AddTokenheader(request, token);
    }
    
    return next.handle(authReq).pipe(
      catchError((error: any) => {

        if ( 
          error instanceof HttpErrorResponse && 
          !authReq.url.includes('auth/signin') && 
          error.status === 401
          ) {
           return this.handle401Error(authReq, next);
        }

        // if (errordata.status === 401) {
        //   // Exclude interceptor for login request:
        //   return this.handleRefrehToken(request, next);
        // }
        return throwError(() => error);
      })
    );


  }

  handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    
    // return this._auth.GenerateRefreshToken().pipe(
    //   switchMap((data: any) => {
    //     let user = this._auth.loadFromLocalStorage();
    //     user.accessToken = data.accessToken;
    //     user.refreshToken = data.refreshToken;
    //     this._auth.saveToLocalStorage(user);

    //     return next.handle(this.AddTokenheader(request, data.accessToken));
    //   }),
    //   catchError((errordata) => {
    //     this._auth.logout();
    //     return throwError(() => errordata);
    //   })
    // );


    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const token = this._auth.GetRefreshToken();

      if (token)
        return this._auth.GenerateRefreshToken(token).pipe(
          switchMap((x: any) => {
            this.isRefreshing = false;
            let user = this._auth.loadFromLocalStorage();
            user.accessToken = x.accessToken;
            this._auth.saveToLocalStorage(user);
            this.refreshTokenSubject.next(x.accessToken);
            return next.handle(this.AddTokenheader(request, x.accessToken));
          }),
          catchError((err) => {
            this.isRefreshing = false;
            this._auth.logout();
            return throwError(() => err);
          })
        );
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.AddTokenheader(request, token)))
    );

  }

  AddTokenheader(request: HttpRequest<any>, token: any) {
    request = request.clone({
      headers: request.headers.set('Authorization', 'bearer ' + token),
    });
    
    return request;
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
];
