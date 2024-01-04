import { Injectable, inject } from '@angular/core';
import { Book } from './book';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({  providedIn: 'root'})
export class BookApiService {
  private readonly http = inject(HttpClient);

  readonly #baseUrl = 'http://localhost:4730';

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.#baseUrl}/books`);
  }

  getByIsbn(isbn: string): Observable<Book> {
    return this.http.get<Book>(`${this.#baseUrl}/books/${isbn}`);
  }
}
