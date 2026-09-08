import { httpResource } from '@angular/common/http';
import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Book } from '../book';
import { BookDetail } from '../book-detail/book-detail';

@Component({
  selector: 'app-book-detail-page',
  imports: [RouterLink, BookDetail],
  templateUrl: './book-detail-page.html'
})
export class BookDetailPage {
  readonly isbn = input('');

  private readonly bookResource = httpResource<Book>(
    () => `http://localhost:4730/books/${this.isbn()}`
  );

  protected readonly book = computed(() => this.bookResource.value());
}
