import { CanDeactivateFn } from '@angular/router';

import { BookCreatePage } from './book-create-page/book-create-page';

// A `CanDeactivate` guard receives the component instance that is about to be
// left. This simple guard only knows `BookCreatePage`: it interrupts the
// navigation when that page reports unsaved changes - otherwise leaving is fine.
export const confirmLeaveGuard: CanDeactivateFn<unknown> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  if (component instanceof BookCreatePage && component.hasUnsavedChanges()) {
    return confirm('You have unsaved changes. Do you really want to leave?');
  }

  return true;
};
