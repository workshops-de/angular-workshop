import { Routes } from '@angular/router';
import { BookComponent } from './book.component';
import { BookNewComponent } from './book-new/book-new.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { confirmLeaveGuardFn } from './confirm-leave.guard';

export const bookRoutes: Routes = [
  {
    path: '',
    component: BookComponent
  },
  {
    path: 'new',
    component: BookNewComponent
  },
  {
    path: 'detail/:isbn',
    loadComponent: () =>
      import('./book-detail/book-detail.component').then(c => c.BookDetailComponent),
    canDeactivate: [confirmLeaveGuardFn]
  },
  {
    path: 'edit/:isbn',
    component: BookEditComponent
  }
];
