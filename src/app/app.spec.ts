import { render, screen } from '@testing-library/angular';
import { App } from './app';

describe('App', () => {
  it('renders a book card', async () => {
    await render(App);

    expect(screen.getByText('How to win friends')).toBeInTheDocument();
  });
});
