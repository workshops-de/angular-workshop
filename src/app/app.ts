import { Component, signal } from '@angular/core';

import { Sidebar, Welcome } from '@workshop-support';

@Component({
  selector: 'app-root',
  imports: [Sidebar, Welcome],
  templateUrl: './app.html'
})
export class App {
  warmWelcome = signal('Angularian');
  greet = signal('Hello');

  constructor() {
    setTimeout(() => {
      this.warmWelcome.update(warmWelcome => `${this.greet()} ${warmWelcome}`);
    }, 6000);
  }
}
