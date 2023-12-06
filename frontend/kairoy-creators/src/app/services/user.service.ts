import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { User, UserAPI } from './interfaces/kairoy';
import { web5 } from '@web5/api';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private api: UserAPI) {}

  getUser(): Observable<User> {
    return window.web5.did.get().pipe(
      switchMap((did) => {
        if (did) {
          return this.api.getUserByDID(did);
        } else {
          return window.web5.did.create().pipe(
            switchMap((newDid) => {
              return this.api.createUser({ did: newDid });
            }),
            switchMap((createdUser) => this.api.getUserByDID(createdUser.did))
          );
        }
      }),
      catchError((error) => of({ did: error.message }))
    );
  }

  updateUser(user: User): Observable<User> {
    return this.api.updateUser(user).pipe(
      catchError((error) => throwError(error))
    );
  }
}

