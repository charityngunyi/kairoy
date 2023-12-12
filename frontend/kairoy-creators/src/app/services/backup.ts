import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { User, UserAPI } from '../interfaces/kairoy';
import { web5 } from '@web5/api';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private getUserUrl: string = `${this.baseUrl}/users/get-by-did`;
  accessToken = '';
  refreshToken = '';

  constructor(private api: UserAPI, private http: HttpClient) {
    this.accessToken = this.getAccessToken() || '';
  }
  
  getUser(): Observable<User> {
  return window.web5.did.get().pipe(
    switchMap((did) => {
      if (!did) {
        return throwError(() => new Error('No DID found'));
      }

      // Prepare the request body with the DID
      const body = { did };

      // Send a POST request to the backend
      return this.http.post<User>(this.getUserUrl, body).pipe(
        tap((user) => {
          // Store the access and refresh tokens
          this.setAccessToken(user.accessToken);
          this.setRefreshToken(user.refreshToken);
        }),
        catchError((error) => of({ did: error.message }))
      );
    })
  );
}


  updateUser(user: User): Observable<User> {
    return this.api.updateUser(user).pipe(
      catchError((error) => throwError(error))
    );
  }


getCurrentDID(): Observable<string> {
  return from(window.web5.did.get());
}

  setAccessToken(token: string): void {
    this.accessToken = token;
    localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  private clearAccessToken(): void {
    this.accessToken = '';
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
  }

  refresh(): Observable<any> {
    return this.http.post(`${this.baseUrl}/token/refresh/`, {}, { withCredentials: true });
  }

  private clearRefreshToken(): void {
    this.refreshToken = '';
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  setRefreshToken(token: string): void {
    this.refreshToken = token;
    localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  refreshTokens(refreshToken: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/token/refresh/`, { refresh: refreshToken });
  }

  // interfaces backups
  // User
export interface User {
  did: string;
  username: string;
  email: string;
}

// User API
export interface UserAPI {
  getUserByDID(did: string): Observable<User>;
  updateUser(user: User): Observable<User>;
}

// Content
export interface Content {
  id: string;
  authorId: string;
  title: string;
  type: string;
  content: string;
  publishedDate: Date;
}

// Share
export interface Share {
  id: string;
  contentId: string;
  sharedWith: string;
  permission: string;
}

// Content API
// content-api.interface.ts

export interface ContentAPI {
  getContents(): Observable<Content[]>;
  getContent(id: string): Observable<Content>;
  createContent(content: Content): Observable<Content>;
  updateContent(id: string, content: Content): Observable<Content>;
  deleteContent(id: string): Observable<void>;

  // DWN-related methods using observables
  storeContentToDWN(content: Content): Observable<void>;
  deleteContentFromDWN(id: string): Observable<void>;
}

}

