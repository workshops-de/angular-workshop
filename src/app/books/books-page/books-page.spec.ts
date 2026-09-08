import { signal } from '@angular/core';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { BooksPage } from './books-page';
import { BooksClient } from '../books-client';
import { Book } from '../book';

describe('BooksPage', () => {
  const mobyDick: Book = {
    isbn: '978-3-16-148410-0',
    cover: '',
    title: 'Moby Dick',
    author: 'Herman Melville'
  };
  const friends: Book = {
    isbn: '978-0-671-72322-5',
    cover: '',
    title: 'How to win friends',
    author: 'Dale Carnegie'
  };

  function mockBooksResource(books: Book[]) {
    return { value: signal(books), isLoading: signal(false), error: signal(undefined) };
  }

  it('renders all books from the mocked BooksClient', async () => {
    const booksClientMock = {
      getAll: vi.fn().mockReturnValue(mockBooksResource([mobyDick, friends]))
    };

    await render(BooksPage, {
      providers: [{ provide: BooksClient, useValue: booksClientMock }]
    });

    expect(screen.getByText(mobyDick.title)).toBeInTheDocument();
    expect(screen.getByText(friends.title)).toBeInTheDocument();
    expect(booksClientMock.getAll).toHaveBeenCalled();
  });

  it('filters books by the search term', async () => {
    const booksClientMock = {
      getAll: vi.fn().mockReturnValue(mockBooksResource([mobyDick, friends]))
    };

    await render(BooksPage, {
      providers: [{ provide: BooksClient, useValue: booksClientMock }]
    });

    const user = userEvent.setup();
    await user.type(screen.getByRole('searchbox'), 'Moby');

    expect(screen.getByText(mobyDick.title)).toBeInTheDocument();
    expect(screen.queryByText(friends.title)).not.toBeInTheDocument();
  });
});
