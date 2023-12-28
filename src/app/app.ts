import { Component } from '@angular/core';
import { BooksPage } from './book/books-page';

@Component({
  selector: 'app-root',
  imports: [BooksPage],
  templateUrl: './app.html'
})
export class App {}
