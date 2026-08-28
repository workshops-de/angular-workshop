import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookCard } from './book-card';
import { Book } from '../book';

describe('BookCard', () => {
  const book: Book = {
    id: 'a1b76e0a-6f19-4c9c-9d3e-1b7f5e2a1c7c',
    isbn: '978-3-16-148410-0',
    cover: '',
    title: 'Moby Dick',
    author: 'Herman Melville'
  };

  let component: BookCard;
  let fixture: ComponentFixture<BookCard>;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    fixture = TestBed.createComponent(BookCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('book', book);
    fixture.detectChanges();
  });

  it('should display the book title', () => {
    const title = fixture.nativeElement.querySelector('h3');
    expect(title.textContent).toContain('Moby Dick');
  });

  it('should display the book author', () => {
    const author = fixture.nativeElement.querySelector('h4');
    expect(author.textContent).toContain('Herman Melville');
  });
});
