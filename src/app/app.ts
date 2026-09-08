import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Sidebar } from '@workshop-support';

@Component({
  selector: 'app-root',
  imports: [Sidebar, RouterOutlet],
  templateUrl: './app.html'
})
export class App {}
