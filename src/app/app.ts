import { Component, computed, inject, signal } from '@angular/core';
import { Book } from './books/book';
import { BookCard } from './books/book-card/book-card';
import { BooksClient } from './books/books-client';

@Component({
  selector: 'app-root',
  imports: [BookCard],
  templateUrl: './app.html'
})
export class App {
  private readonly booksClient = inject(BooksClient);

  searchTerm = signal('');
  books = this.booksClient.getAll();

  booksComputed = computed(() => {
    const searchTerm = this.searchTerm().toLowerCase();
    const books = this.books();

    return !searchTerm
      ? books
      : books.filter(book => book.title.toLowerCase().includes(searchTerm));
  });

  goToBookDetails(book: Book) {
    console.log('Navigate to book details, soon...');
    console.table(book);
  }
}
