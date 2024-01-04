import { Component, signal } from '@angular/core';

import { BookCreateForm } from '../book-create-form/book-create-form';

@Component({
  selector: 'app-book-create',
  imports: [BookCreateForm],
  templateUrl: './book-create-page.html'
})
export class BookCreatePage {
  // Does the embedded form hold unsaved changes? Hard-coded for now so the guard
  // has something to react to - the Submission task sets it to `false` once the
  // book is saved.
  readonly hasUnsavedChanges = signal(true);
}
