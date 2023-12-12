import { CanActivateFn } from '@angular/router';

export const userrouteGuard: CanActivateFn = (route, state) => {
  for (const segment of route.url) {
      if (segment.path !== '/user') {
        return true; // User is not on the user page, allow activation
      }
    }
    return false; // User is on the user page, deny activation
  }
;
