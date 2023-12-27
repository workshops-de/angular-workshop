import { Component } from '@angular/core';
import { BookCardComponent } from './book-card/book-card.component';
import { Book } from './book';

@Component({
  selector: 'app-root',
  imports: [BookCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  book: Book = {
    title: 'How to win friends',
    author: 'Dale Carnegie',
    abstract:
      "How to Win Friends and Influence People is a self-help book written by Dale Carnegie, published in 1936. Over 30 million copies have been sold worldwide, making it one of the best-selling books of all time. In 2011, it was number 19 on Time Magazine's list of the 100 most influential books."
  };

  goToBookDetails(book: Book) {
    console.log('Navigate to book details, soon...');
    console.table(book);
  }
}
