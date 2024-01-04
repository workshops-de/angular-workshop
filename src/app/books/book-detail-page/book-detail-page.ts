import { JsonPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, input } from '@angular/core';
import { Book } from '../book';

@Component({
  imports: [JsonPipe],
  selector: 'app-book-detail-page',
  template: ` {{ bookResource.value() | json }} `
})
export class BookDetailPage {
  isbn = input('');

  bookResource = httpResource<Book>(() => `http://localhost:4730/books/${this.isbn()}`);
}
