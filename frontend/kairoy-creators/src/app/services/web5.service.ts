import { Injectable } from '@angular/core';
import { Injectable } from '@angular/core';
import { from, Observable, from } from 'rxjs';
import { web5 } from '@web5/api';

@Injectable({
  providedIn: 'root',
})
export class Web5Service {
  CreateProtocol(protocolDefinition: any): Observable<any> {
    return from(
      web5.dwn.protocols.configure({
        message: {
          definition: protocolDefinition,
        },
      })
    ).pipe(
      switchMap(({ protocol, status }) =>
        from(protocol.send(myDid)).pipe(
          map(() => ({ protocol, status }))
        )
      )
    );
  }
}

