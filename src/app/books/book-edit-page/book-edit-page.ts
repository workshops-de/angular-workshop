import { Component, input } from '@angular/core';

import { BookEditForm } from '../book-edit-form/book-edit-form';

@Component({
  selector: 'app-book-edit',
  imports: [BookEditForm],
  templateUrl: './book-edit-page.html'
})
export class BookEditPage {
  readonly isbn = input.required<string>();
}
