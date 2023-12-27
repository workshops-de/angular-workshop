import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.html'
})
export class BookCard {
  customStyle = signal({ color: '#064D9E', fontWeight: 600 });

  readonly placeholderCover = 'book-cover-placeholder.svg';
}
