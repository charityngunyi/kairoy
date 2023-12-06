import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { Content, ContentAPI } from './interfaces/kairoy';
import { web5 } from '@web5/api';

@Injectable({ providedIn: 'root' })
export class ContentService {
  constructor(private api: ContentAPI) {}

  getContents(): Observable<Content[]> {
    return this.api.getContents();
  }

  getContent(id: string): Observable<Content> {
    return this.api.getContent(id);
  }

  createContent(content: Content): Observable<Content> {
    return this.storeToDWN(content).pipe(
      switchMap(() => this.api.createContent(content)),
      catchError((error) => throwError(error))
    );
  }

  updateContent(content: Content): Observable<Content> {
    return this.storeToDWN(content).pipe(
      switchMap(() => this.api.updateContent(content)),
      catchError((error) => throwError(error))
    );
  }

  deleteContent(id: string): Observable<void> {
    return this.deleteFromDWN(id).pipe(
      switchMap(() => this.api.deleteContent(id)),
      catchError((error) => throwError(error))
    );
  }
}
