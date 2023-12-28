import { Component } from '@angular/core';
import { BooksPage } from './books/books-page';

@Component({
  selector: 'app-root',
  imports: [BooksPage],
  templateUrl: './app.html'
})
export class App {}
