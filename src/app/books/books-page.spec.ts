import { Component, input, signal } from '@angular/core';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { BooksPage } from './books-page';
import { BookCard } from './book-card/book-card';
import { BooksClient } from './books-client';
import { Book } from './book';

@Component({
  selector: 'app-book-card',
  template: `<div data-testid="mock-book-card">{{ content().title }}</div>`
})
class BookCardMock {
  content = input.required<Book>();
}

describe('BooksPage', () => {
  const mobyDick: Book = {
    isbn: '978-3-16-148410-0',
    cover: '',
    title: 'Moby Dick',
    author: 'Herman Melville',
    abstract: 'A whale of a tale.'
  };
  const friends: Book = {
    isbn: '978-0-671-72322-5',
    cover: '',
    title: 'How to win friends',
    author: 'Dale Carnegie',
    abstract: 'A self-help classic.'
  };

  function mockBooksResource(books: Book[]) {
    return { value: signal(books), isLoading: signal(false), error: signal(undefined) };
  }

  it('renders all books from the mocked BooksClient', async () => {
    const booksClientMock = {
      getAll: vi.fn().mockReturnValue(mockBooksResource([mobyDick, friends]))
    };

    await render(BooksPage, {
      importOverrides: [{ replace: BookCard, with: BookCardMock }],
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
      importOverrides: [{ replace: BookCard, with: BookCardMock }],
      providers: [{ provide: BooksClient, useValue: booksClientMock }]
    });

    const user = userEvent.setup();
    await user.type(screen.getByRole('searchbox'), 'Moby');

    expect(screen.getByText(mobyDick.title)).toBeInTheDocument();
    expect(screen.queryByText(friends.title)).not.toBeInTheDocument();
  });

  it('renders one book card per book, without depending on BookCard internals', async () => {
    const booksClientMock = {
      getAll: vi.fn().mockReturnValue(mockBooksResource([mobyDick, friends]))
    };

    await render(BooksPage, {
      importOverrides: [{ replace: BookCard, with: BookCardMock }],
      providers: [{ provide: BooksClient, useValue: booksClientMock }]
    });

    const cards = screen.getAllByTestId('mock-book-card');
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent('Moby Dick');
    expect(cards[1]).toHaveTextContent('How to win friends');
  });
});
