import { Component } from '@angular/core';

// import { BookDetail } from '../book-detail/book-detail';

// Prepared template - copy this folder to src/app/books/book-detail-page/ and
// wire the data: read the :isbn route param via an input, pass it to
// BooksClient.getByIsbn() (httpResource) and hand the book to <app-book-detail>.
// Then comment in the prepared lines below and in the template.
@Component({
  selector: 'app-book-detail-page',
  imports: [
    // BookDetail
  ],
  templateUrl: './book-detail-page.html'
})
export class BookDetailPage {
  // readonly isbn = input('');
  // private readonly booksClient = inject(BooksClient);
  // private readonly bookResource = this.booksClient.getByIsbn(this.isbn);
  // protected readonly book = computed(() => this.bookResource.value());
}
