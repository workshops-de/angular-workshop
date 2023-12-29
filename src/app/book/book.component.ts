import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BookCardComponent } from './book-card/book-card.component';
import { BookFilterPipe } from './book-filter/book-filter.pipe';
import { Book } from './book';
import { BookApiService } from './book-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book',
  imports: [BookCardComponent, BookFilterPipe],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent implements OnInit, OnDestroy {
  private readonly bookApi = inject(BookApiService);

  bookSearchTerm = '';
  books: Book[] = [];
  bookApiSubscription = Subscription.EMPTY;

  ngOnInit(): void {
    this.bookApiSubscription = this.bookApi
      .getAll()
      .subscribe(booksFromService => (this.books = booksFromService));
  }

  ngOnDestroy(): void {
    this.bookApiSubscription.unsubscribe();
  }

  goToBookDetails(book: Book) {
    console.log('Navigate to book details, soon...');
    console.table(book);
  }

  updateBookSearchTerm(input: Event) {
    this.bookSearchTerm = (input.target as HTMLInputElement).value;
  }
}
