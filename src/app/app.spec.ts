import { render, screen } from '@testing-library/angular';
import { App } from './app';

describe('AppComponent', () => {
  it('renders the title', async () => {
    await render(App);

    expect(screen.getByText('Hello, Angularian!')).toBeInTheDocument();
  });
});
