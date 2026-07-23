import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { Book } from '../book';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './book-card.component.scss'
})
export class BookCardComponent {
  customStyle = { color: '#064D9E', fontWeight: 600 };

  readonly content = input.required<Book>();
  readonly detailClick = output<Book>();

  handleDetailClick(click: MouseEvent) {
    click.preventDefault();

    console.log('Click Details-Link:', click);

    this.detailClick.emit(this.content());
  }
}
