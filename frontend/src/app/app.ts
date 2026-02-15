import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ConnectivityService } from './services/connection-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
  name = 'EatNow';

  constructor(private connectivityService: ConnectivityService) {
    console.log('App started: Connectivity Watchdog is now running');
  }
}
