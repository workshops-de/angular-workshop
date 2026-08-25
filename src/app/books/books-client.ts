import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './book';

@Injectable({ providedIn: 'root' })
export class BooksClient {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:4730';

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/books`);
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
