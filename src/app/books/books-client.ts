import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
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
  private readonly baseUrl = 'http://localhost:4730';

  getAll() {
    return httpResource<Book[]>(() => ({ url: `${this.baseUrl}/books` }), {
      defaultValue: [],
      parse: value => v.parse(BooksCollectionSchema, value)
    });
  }

  getByIsbnResource(isbn: Signal<string>) {
    return httpResource<Book>(() => ({ url: `${this.baseUrl}/books/${isbn()}` }));
  }

  create(book: Partial<Book>): Observable<Book> {
    return this.http.post<Book>('http://localhost:4730/books', book);
  }

  update(isbn: string, book: Partial<Book>): Observable<Book> {
    return this.http.put<Book>(`${this.baseUrl}/books/${isbn}`, book);
  }
}
