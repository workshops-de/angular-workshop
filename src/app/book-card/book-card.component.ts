import { Component, input } from '@angular/core';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss'
})
export class BookCardComponent {
  customStyle = { color: '#064D9E', fontWeight: 600 };

  // TODO: Replace any with proper type since can it cause critical runtime errors.
  readonly content = input<any>();
}
