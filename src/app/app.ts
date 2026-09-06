import { Component, signal } from '@angular/core';

import { Sidebar } from './lib/sidebar/sidebar';

@Component({
  selector: 'app-root',
  imports: [Sidebar],
  templateUrl: './app.html'
})
export class App {
  // Task: replace this line and greet yourself with your own name.
  attendeeName = signal('Angularian');
}
