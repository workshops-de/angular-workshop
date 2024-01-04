import { CanDeactivateFn } from '@angular/router';
import { BookDetailPage } from './book-detail-page/book-detail-page';

export const confirmLeaveGuardFn: CanDeactivateFn<BookDetailPage> = (route, state) => {
  const wantsToLeave = confirm('Do you really want to leave?');

  return wantsToLeave;
};
