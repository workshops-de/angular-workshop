import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { BooksClient } from './books-client';
import { Book } from './book';

describe('BooksClient', () => {
  let booksClient: BooksClient;
  let httpMock: HttpTestingController;

  const mobyDick: Book = {
    isbn: '978-3-16-148410-0',
    title: 'Moby Dick',
    author: 'Herman Melville',
    abstract: 'A whale of a tale.'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });

    booksClient = TestBed.inject(BooksClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('loads all books via GET', async () => {
    const booksResource = TestBed.runInInjectionContext(() => booksClient.getAll());
    TestBed.tick();

    httpMock.expectOne('http://localhost:4730/books').flush([mobyDick]);

    await vi.waitFor(() => expect(booksResource.value()).toEqual([mobyDick]));
  });

  it('creates a book via POST', () => {
    let created: Book | undefined;
    booksClient.create(mobyDick).subscribe(book => (created = book));

    const req = httpMock.expectOne('http://localhost:4730/books');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mobyDick);
    req.flush(mobyDick);

    expect(created).toEqual(mobyDick);
  });

  it('updates a book via PUT', () => {
    let updated: Book | undefined;
    booksClient.update(mobyDick.isbn, mobyDick).subscribe(book => (updated = book));

    const req = httpMock.expectOne(`http://localhost:4730/books/${mobyDick.isbn}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mobyDick);
    req.flush(mobyDick);

    expect(updated).toEqual(mobyDick);
  });
});
