import { Routes } from '@angular/router';
import { BookComponent } from './book.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { confirmLeaveGuardFn } from './confirm-leave.guard';

export const bookRoutes: Routes = [
  {
    path: '',
    component: BookComponent
  },
  {
    path: 'detail/:isbn',
    component: BookDetailComponent,
    canDeactivate: [confirmLeaveGuardFn]
  }
];
