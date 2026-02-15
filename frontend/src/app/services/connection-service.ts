//TODO Fabian: understand subscribe/next/error better

/*
    Watchdog Service:
    - Periodically pings the backend to check connectivity.
    - Exposes an observable that components can subscribe to for real-time connectivity status.
*/

/*
  Notes for Fabian:
    Subscribe: Subscribes to an observable to receive updates. In this case, it listens for changes in connectivity status.
    Observable: A stream of data that components can subscribe to.
*/

import { LocalStorageService } from './local-storage-service';
import { CartService } from './cart-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, timer, of } from 'rxjs';
import { switchMap, catchError, retry } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConnectivityService {

  private apiUrl = 'http://localhost:3000/api';

  private isOnline$ = new BehaviorSubject<boolean>(true);
  public isOnlineStatus$ = this.isOnline$.asObservable();

  constructor(
      private http: HttpClient,
      private localStorageService: LocalStorageService,
      private cartService: CartService
      ) {
    this.startWatchdog();
  }

  private startWatchdog() {
    timer(0, 5000).pipe(
      switchMap(() => this.http.get(this.apiUrl + '/ping').pipe(
        catchError(() => of(null) )
      ))
    ).subscribe(response => {
      const connectionIsOnline = response !== null;

      //only act if the status has changed
      if(connectionIsOnline && !this.isOnline$.value) {
        console.log('Connection restored, syncing pending cart...');
        this.isOnline$.next(true);
        this.triggerSync();
      }
      else if(!connectionIsOnline && this.isOnline$.value) {
        console.log('Connection lost, switching to offline mode...');
        this.isOnline$.next(false);
      }
     
    });
  }

  private triggerSync() {   
    this.cartService.loadCartFromLocalStorage();
  }
}