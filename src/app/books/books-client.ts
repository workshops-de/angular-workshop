import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BooksClient {
  readonly #baseUrl = 'http://localhost:4730';

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
}
