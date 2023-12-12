import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { switchMap, catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Web5 } from "@web5/api";

@Injectable({ providedIn: 'root' })
export class UserService {
  currentUserDid = '';
  constructor(private http: HttpClient) {
    }

// Assuming this code is within a service method
createUserDid(): Observable<{ web5: any, did: string }> {
  return from(Web5.connect()).pipe(
    tap(({ web5, did }) => {
      console.log('Web5 connected:', web5);
      console.log('User DID created:', did);
      this.currentUserDid = did;
      // You can perform additional actions with web5 and did here
    }),
    catchError((error) => {
      console.error('Error connecting to Web5:', error);
      return [];
    })
  );
}

}

