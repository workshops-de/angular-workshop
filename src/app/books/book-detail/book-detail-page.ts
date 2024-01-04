import { AsyncPipe } from '@angular/common';
import { Component, effect, inject, input } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../book';
import { BooksClient } from '../books-client';

@Component({
  selector: 'app-book-detail',
  imports: [AsyncPipe],
  templateUrl: './book-detail-page.html'
})
export class BookDetailPage {
  private readonly booksClient = inject(BooksClient);
  book$!: Observable<Book>;

  isbn = input.required<string>();

  constructor() {
    effect(() => this.getBookByIsbn(this.isbn()));
  }

  private getBookByIsbn(isbn: string): void {
    this.book$ = this.booksClient.getByIsbn(isbn);
  }
}
