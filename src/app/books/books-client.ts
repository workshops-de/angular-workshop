import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './book';

@Injectable({ providedIn: 'root' })
export class BooksClient {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:4730';

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/books`);
  }

  getByIsbn(isbn: string): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/books/${isbn}`);
  }

  create(book: Partial<Book>): Observable<Book> {
    return this.http.post<Book>('http://localhost:4730/books', book);
  }
}
