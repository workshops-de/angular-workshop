import { CanMatchFn } from '@angular/router';
import { UserState } from './user-state';
import { inject } from '@angular/core';

export const isUserAuthenticatedGuardFn: CanMatchFn = (route, state) => {
  const service = inject(UserState);

  return service.isLoggedIn;
};
