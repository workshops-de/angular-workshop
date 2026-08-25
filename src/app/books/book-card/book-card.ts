import { Component, input, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Book } from '../book';
import { Marker } from '../marker';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.html',
  imports: [DatePipe, Marker]
})
export class BookCard {
  customStyle = signal({ color: '#064D9E', fontWeight: 600 });

  readonly placeholderCover = 'book-cover-placeholder.svg';

  readonly book = input.required<Book>();
  readonly markTerm = input('');

  readonly searchTerm = input('');
}
