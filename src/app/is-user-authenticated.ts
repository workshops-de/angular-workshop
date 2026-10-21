import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';

import { UserState } from './user-state';

// A `CanMatch` guard decides whether a route may be matched at all.
// If it returns `false`, the router keeps looking for another route.
export const isUserAuthenticatedGuardFn: CanMatchFn = () => {
  const userState = inject(UserState);

  return userState.isLoggedIn();
};
