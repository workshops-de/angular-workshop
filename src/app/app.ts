import { Component } from '@angular/core';
import { BookCard } from './books/book-card/book-card';

@Component({
  selector: 'app-root',
  imports: [BookCard],
  templateUrl: './app.html'
})
export class App {}
