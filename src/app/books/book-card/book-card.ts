import { Component, input, signal } from '@angular/core';
import { Book } from '../book';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.html'
})
export class BookCard {
  customStyle = signal({ color: '#064D9E', fontWeight: 600 });

  readonly content = input.required<Book>();
}
