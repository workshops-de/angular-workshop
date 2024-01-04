import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { render, screen } from '@testing-library/angular';
import { BooksPage } from './books-page';
import { Book } from './book';

describe('BooksPage', () => {
  it('renders a book loaded from the API', async () => {
    const book: Book = {
      isbn: '978-3-16-148410-0',
      cover: '',
      title: 'How to win friends',
      author: 'Dale Carnegie',
      abstract: 'A self-help classic.'
    };

    await render(BooksPage, {
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });

    TestBed.inject(HttpTestingController).expectOne('http://localhost:4730/books').flush([book]);

    expect(await screen.findByText('How to win friends')).toBeInTheDocument();
  });
});
