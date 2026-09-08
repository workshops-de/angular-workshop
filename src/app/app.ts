import { Component } from '@angular/core';

import { Sidebar } from '@workshop-support';
import { BooksPage } from './books/books-page/books-page';

@Component({
  selector: 'app-root',
  imports: [Sidebar, BooksPage],
  templateUrl: './app.html'
})
export class App {}
