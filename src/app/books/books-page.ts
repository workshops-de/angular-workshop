import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Book } from './book';
import { BookCard } from './book-card/book-card';
import { BooksClient } from './books-client';

@Component({
  selector: 'app-book',
  imports: [BookCard],
  templateUrl: './books-page.html'
})
export class BooksPage {
  private readonly booksClient = inject(BooksClient);
  private readonly router = inject(Router);

  searchTerm = signal('');
  books = toSignal(this.booksClient.getAll(), { initialValue: [] });

  booksComputed = computed(() => {
    const searchTerm = this.searchTerm().toLocaleLowerCase();
    const books = this.books();

    return !searchTerm
      ? books
      : books.filter(book => book.title.toLocaleLowerCase().includes(searchTerm));
  });

  goToBookDetails(book: Book) {
    this.router.navigate(['books', 'detail', book.isbn]);
  }
}
