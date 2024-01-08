import { inject, Injectable } from '@angular/core';
import { Book } from './book';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookApiService {
  readonly #http = inject(HttpClient);
  readonly #baseUrl = 'http://localhost:4730';

  getAll(): Observable<Book[]> {
    return this.#http.get<Book[]>(`${this.#baseUrl}/books`);
  }

  getByIsbn(isbn: string): Observable<Book> {
    return this.#http.get<Book>(`${this.#baseUrl}/books/${isbn}`);
  }

  create(book: Partial<Book>): Observable<Book> {
    return this.#http.post<Book>('http://localhost:4730/books', book);
  }
}
