import { Routes } from '@angular/router';
import { BookComponent } from './book.component';
import { confirmLeaveGuardFn } from './confirm-leave.guard';

export const bookRoutes: Routes = [
  {
    path: '',
    component: BookComponent
  },
  {
    path: 'detail/:isbn',
    loadComponent: () =>
      import('./book-detail/book-detail.component').then(c => c.BookDetailComponent),
    canDeactivate: [confirmLeaveGuardFn]
  }
];
