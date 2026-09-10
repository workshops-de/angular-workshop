import { Component, signal } from '@angular/core';

import { Sidebar, Welcome } from '@workshop-support';

@Component({
  selector: 'app-root',
  imports: [Sidebar, Welcome],
  templateUrl: './app.html'
})
export class App {
  attendeeName = signal('Angularian');
}
