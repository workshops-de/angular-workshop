import { Component } from '@angular/core';
import { BookCardComponent } from './book-card/book-card.component';
import { Book } from './book';
import { BookFilterPipe } from './book-filter/book-filter.pipe';

@Component({
  selector: 'app-root',
  imports: [BookCardComponent, BookFilterPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  bookSearchTerm = '';
  books: Book[] = [
    {
      title: 'How to win friends',
      author: 'Dale Carnegie',
      abstract:
        "How to Win Friends and Influence People is a self-help book written by Dale Carnegie, published in 1936. Over 30 million copies have been sold worldwide, making it one of the best-selling books of all time. In 2011, it was number 19 on Time Magazine's list of the 100 most influential books."
    },
    {
      title:
        'The Willpower Instinct: How Self-Control Works, Why It Matters, and What You Can Do to Get More of It',
      author: 'Kelly McGonigal',
      abstract:
        'Based on Stanford University psychologist Kelly McGonigal\'s wildly popular course "The Science of Willpower," The Willpower Instinct is the first book to explain the new science of self-control and how it can be harnessed to improve our health, happiness, and productivity'
    },
    {
      author: 'Simon Sinek',
      title: 'Start with WHY',
      abstract:
        "START WITH WHY shows that the leaders who've had the greatest influence in the world all think, act, and communicate the same way -- and it's the opposite of what everyone else does. Sinek calls this powerful idea The Golden Circle, and it provides a framework upon which organizations can be built, movements can be led, and people can be inspired. And it all starts with WHY."
    }
  ];

  goToBookDetails(book: Book) {
    console.log('Navigate to book details, soon...');
    console.table(book);
  }

  updateBookSearchTerm(input: Event) {
    this.bookSearchTerm = (input.target as HTMLInputElement).value;
  }
}
