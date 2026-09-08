import { Component, signal } from '@angular/core';

import { Sidebar } from './lib/sidebar/sidebar';
import { Welcome } from './lib/welcome/welcome';

@Component({
  selector: 'app-root',
  imports: [Sidebar, Welcome],
  templateUrl: './app.html'
})
export class App {
  // Task: replace this line and greet yourself with your own name.
  attendeeName = signal('Angularian');
}
