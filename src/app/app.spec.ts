import { render, screen } from '@testing-library/angular';
import { App } from './app';

describe('App', () => {
  it('renders the workshop shell', async () => {
    await render(App);

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
