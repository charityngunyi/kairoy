import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Content } from './content.model';
import { web5 } from '@web5/api';

@Injectable({ providedIn: 'root' })
export class ContentDawnService {

  async storeToDWN(content: Content): Promise<void> {
    const contentData = JSON.stringify(content);
    await window.web5.file.write(contentData, `content-${content.id}`);
  }

  async deleteFromDWN(id: string): Promise<void> {
    await window.web5.file.delete(`content-${id}`);
  }

  storeContentToDWN(content: Content): Observable<void> {
    return new Observable((observer) => {
      this.storeToDWN(content).then(() => {
        observer.next();
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  deleteContentFromDWN(id: string): Observable<void> {
    return new Observable((observer) => {
      this.deleteFromDWN(id).then(() => {
        observer.next();
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
    });
  }
}
