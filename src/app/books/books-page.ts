import { Component, inject, signal } from '@angular/core';
import { Book } from './book';
import { BooksClient } from './books-client';
import { BookCard } from './book-card/book-card';
import { BookFilter } from './book-filter/book-filter';

@Component({
  selector: 'app-book',
  imports: [BookCard, BookFilter],
  templateUrl: './books-page.html'
})
export class BooksPage {
  private readonly booksClient = inject(BooksClient);

  bookSearchTerm = signal('');
  books = signal<Book[]>([]);

  constructor() {
    this.booksClient.getAll().subscribe(booksFromService => this.books.set(booksFromService));
  }

  goToBookDetails(book: Book) {
    console.log('Navigate to book details, soon...');
    console.table(book);
  }

  updateBookSearchTerm(searchTerm: string) {
    this.bookSearchTerm.set(searchTerm);
  }
}
