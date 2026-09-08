import { Component } from '@angular/core';

import { BookCreateForm } from '../book-create-form/book-create-form';

@Component({
  selector: 'app-book-create',
  imports: [BookCreateForm],
  templateUrl: './book-create-page.html'
})
export class BookCreatePage {}
