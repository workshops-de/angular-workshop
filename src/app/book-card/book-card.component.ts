import { Component, Input } from '@angular/core';
import { Book } from '../book';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss'
})
export class BookCardComponent {
  customStyle = { color: '#064D9E', fontWeight: 600 };

  @Input() content!: Book;
}
