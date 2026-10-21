import { Service, signal } from '@angular/core';

@Service()
export class UserState {
  // Hard-coded for this exercise: switch to `false` to see the guard block the books routes.
  readonly isLoggedIn = signal(true);
}
