import { httpResource } from '@angular/common/http';
import { Service, Signal } from '@angular/core';
import { Book } from './book';

@Service()
export class BooksClient {
  #baseUrl = 'http://localhost:4730';

  getAll() {
    return httpResource<Book[]>(
      () => ({
        url: `${this.#baseUrl}/books`,
        params: {
          _start: 0,
          _end: 15,
          _sort: 'createdAt',
          _order: 'desc'
        }
      }),
      {
        defaultValue: []
      }
    );
  }

  getByIsbn(isbn: Signal<string>) {
    return httpResource<Book>(() => ({
      url: `${this.#baseUrl}/books/${isbn()}`
    }));
  }
}
