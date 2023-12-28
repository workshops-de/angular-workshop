import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BooksClient {
  private readonly http = inject(HttpClient);

  readonly #baseUrl = 'http://localhost:4730';

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.#baseUrl}/books`);
  }
}
