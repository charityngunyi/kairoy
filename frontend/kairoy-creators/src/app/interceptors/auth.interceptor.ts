import { HttpInterceptorFn } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/user.service';
import { Router } from '@angular/router';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: UserService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Check current DID
    const currentDID = this.authService.getCurrentDID();

    let authReq: HttpRequest<unknown>;
    if (currentDID) {
      // Use DID to request a new access token
      authReq = this.addAuthorizationHeader(request, currentDID);
      return this.authService.getAccessTokenByDID(currentDID).pipe(
        switchMap((accessToken) => {
          if (!accessToken) {
            // If no access token is retrieved, trigger the refresh token flow
            return this.refreshTokens(request, next);
          }
          // Update the request with the retrieved access token
          authReq = this.addAuthorizationHeader(request, accessToken);
          return next.handle(authReq);
        }),
        catchError((error) => this.handleError(error, request, next))
      );
    } else {
      // No current DID, trigger the refresh token flow
      return this.refreshTokens(request, next);
    }
  }

  private refreshTokens(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Use the refresh token to get a new access token and DID
    return this.authService.refreshTokens().pipe(
      switchMap((res) => {
        // Update the access token and retry the request with the new DID
        this.authService.setAccessToken(res.access);
        const updatedReq = this.addAuthorizationHeader(request, res.access);
        return next.handle(updatedReq);
      }),
      catchError((refreshError) => this.handleError(refreshError, request, next))
    );
  }

  private addAuthorizationHeader(
    request: HttpRequest<unknown>,
    token?: string
  ): HttpRequest<unknown> {
    if (token) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return request;
  }

  private handleError(error: any, request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (error.status === HttpStatusCode.Unauthorized) {
      this.authService.logout();
    }
    return throwError(() => error);
  }
}
