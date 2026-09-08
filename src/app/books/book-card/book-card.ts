import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.html'
})
export class BookCard {
  customStyle = signal({ color: '#064D9E', fontWeight: 600 });

  readonly placeholderCover = 'book-cover-placeholder.svg';

  // TODO: Replace any with proper type since can it cause critical runtime errors.
  readonly book = input<any>();
}
