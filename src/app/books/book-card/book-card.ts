import { Component, input, output, signal } from '@angular/core';
import { Book } from '../book';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.html'
})
export class BookCard {
  customStyle = signal({ color: '#064D9E', fontWeight: 600 });

  readonly placeholderCover = 'book-cover-placeholder.svg';

  readonly book = input.required<Book>();
  readonly detailClick = output<Book>();
  readonly deleteClick = output<Book>();

  handleDetailClick(click: MouseEvent) {
    click.preventDefault();

    console.log('Click Details-Link:', click);

    this.detailClick.emit(this.book());
  }

  handleDeleteClick(click: MouseEvent) {
    click.preventDefault();

    console.log('Click Delete-Button:', click);

    this.deleteClick.emit(this.book());
  }
}
