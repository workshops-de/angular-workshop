import { render, screen } from '@testing-library/angular';
import { BookCard } from './book-card';
import { Book } from '../book';

describe('BookCard', () => {
  const book: Book = {
    isbn: '978-3-16-148410-0',
    cover: '',
    title: 'Moby Dick',
    author: 'Herman Melville'
  };

  it('should display the book title', async () => {
    await render(BookCard, { componentInputs: { book } });

    expect(screen.getByText(book.title)).toBeInTheDocument();
  });

  it('should display the book author', async () => {
    await render(BookCard, { componentInputs: { book } });

    expect(screen.getByText(book.author!)).toBeInTheDocument();
  });
});
