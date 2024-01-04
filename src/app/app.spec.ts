import { render, screen } from '@testing-library/angular';
import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  it('redirects to the about page by default', async () => {
    await render(App, { routes });

    expect(
      await screen.findByText('This app is all about your books.')
    ).toBeInTheDocument();
  });
});
