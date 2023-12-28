import { Injectable } from '@angular/core';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookApiService {
  getAll(): Book[] {
    return [
      {
        title: 'How to win friends',
        author: 'Dale Carnegie',
        abstract:
          "How to Win Friends and Influence People is a self-help book written by Dale Carnegie, published in 1936. Over 30 million copies have been sold worldwide, making it one of the best-selling books of all time. In 2011, it was number 19 on Time Magazine's list of the 100 most influential books."
      },
      {
        title:
          'The Willpower Instinct: How Self-Control Works, Why It Matters, and What You Can Do to Get More of It',
        author: 'Kelly McGonigal',
        abstract:
          'Based on Stanford University psychologist Kelly McGonigal\'s wildly popular course "The Science of Willpower," The Willpower Instinct is the first book to explain the new science of self-control and how it can be harnessed to improve our health, happiness, and productivity'
      },
      {
        author: 'Simon Sinek',
        title: 'Start with WHY',
        abstract:
          "START WITH WHY shows that the leaders who've had the greatest influence in the world all think, act, and communicate the same way -- and it's the opposite of what everyone else does. Sinek calls this powerful idea The Golden Circle, and it provides a framework upon which organizations can be built, movements can be led, and people can be inspired. And it all starts with WHY."
      }
    ];
  }
}
