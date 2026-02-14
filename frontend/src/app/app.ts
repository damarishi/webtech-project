import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Navbar} from './shared/ui/navbar/navbar';
import {Loading} from './shared/ui/loading/loading';
import {Error} from './shared/ui/error/error';

import { ConnectivityService } from './services/connection-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Loading, Error],
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
