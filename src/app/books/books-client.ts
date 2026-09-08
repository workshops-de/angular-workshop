import { Injectable, signal, WritableSignal } from '@angular/core';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BooksClient {
  getAll(): WritableSignal<Book[]> {
    return signal([
      {
        title: 'How to win friends',
        author: 'Dale Carnegie',
        publishedAt: new Date('1936-10-01')
      },
      {
        title:
          'The Willpower Instinct: How Self-Control Works, Why It Matters, and What You Can Do to Get More of It',
        author: 'Kelly McGonigal',
        publishedAt: new Date('2011-12-29')
      },
      {
        author: 'Simon Sinek',
        title: 'Start with WHY',
        publishedAt: new Date('2009-10-29')
      }
    ]);
  }
}
