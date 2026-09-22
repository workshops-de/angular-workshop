import { Component, signal } from '@angular/core';

import { Welcome } from '@workshop-support';

@Component({
  selector: 'app-root',
  imports: [Welcome],
  templateUrl: './app.html'
})
export class App {
  warmWelcome = signal('Angularian');
}
