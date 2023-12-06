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
