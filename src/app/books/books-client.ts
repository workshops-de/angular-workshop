import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as v from 'valibot';
import { Book, BooksCollectionSchema } from './book';

/**
 *
 *  HttpClient (Observables) vs.  httpResource (Signal) + state
 *                           |
 *                           |
 *                           /\
 *                        HttpBackend
 *                        - same config
 *                        - same testing
 *
 */

@Injectable({ providedIn: 'root' })
export class BooksClient {
  private readonly http = inject(HttpClient);
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
        defaultValue: [],
        parse: value => v.parse(BooksCollectionSchema, value)
      }
    );
  }

  create(book: Partial<Book>): Observable<Book> {
    return this.http.post<Book>(`${this.#baseUrl}/books`, book);
  }

  delete(isbn: string): Observable<void> {
    return this.http.delete<void>(`${this.#baseUrl}/books/${isbn}`);
  }
}
