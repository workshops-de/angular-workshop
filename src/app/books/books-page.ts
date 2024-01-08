import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { Book } from './book';
import { BookCard } from './book-card/book-card';
import { BooksClient } from './books-client';

@Component({
  selector: 'app-book',
  imports: [BookCard, RouterLink],
  templateUrl: './books-page.html'
})
export class BooksPage {
  private readonly router = inject(Router);

  private readonly booksClient = inject(BooksClient);

  searchTerm = signal('');
  books = toSignal(this.booksClient.getAll(), { initialValue: [] });

  booksComputed = computed(() => {
    const searchTerm = this.searchTerm().toLocaleLowerCase();
    const books = this.books();

    return !searchTerm
      ? books
      : books.filter(book => book.title.toLocaleLowerCase().includes(searchTerm));
  });

  async goToBookDetails(book: Book) {
    await this.router.navigate(['/books', 'details', book.isbn]);
  }
}
