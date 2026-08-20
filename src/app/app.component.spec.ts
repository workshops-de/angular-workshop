import { render, screen } from '@testing-library/angular';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  it('renders the title', async () => {
    await render(AppComponent);

    expect(screen.getByText('Hello, Angularian!')).toBeInTheDocument();
  });
});
