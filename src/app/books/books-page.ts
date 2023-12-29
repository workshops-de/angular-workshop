import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from './book';
import { BooksClient } from './books-client';
import { BookCard } from './book-card/book-card';
import { BookFilter } from './book-filter/book-filter';

@Component({
  selector: 'app-book',
  imports: [BookCard, BookFilter],
  templateUrl: './books-page.html'
})
export class BooksPage implements OnInit, OnDestroy {
  private readonly booksClient = inject(BooksClient);

  bookSearchTerm = signal('');
  books = signal<Book[]>([]);
  booksClientSubscription = Subscription.EMPTY;

  ngOnInit(): void {
    this.booksClientSubscription = this.booksClient
      .getAll()
      .subscribe(booksFromService => this.books.set(booksFromService));
  }

  ngOnDestroy(): void {
    this.booksClientSubscription.unsubscribe();
  }

  goToBookDetails(book: Book) {
    console.log('Navigate to book details, soon...');
    console.table(book);
  }

  updateBookSearchTerm(searchTerm: string) {
    this.bookSearchTerm.set(searchTerm);
  }
}
