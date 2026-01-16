import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class RestaurantStateService {
  private searchSubject = new BehaviorSubject<string>('');    //merkt sich den letzten wert
  search$ = this.searchSubject.asObservable();    //kann so nicht verändern, weil behaviorsubject kann .next

  setSearch(value: string) {
    this.searchSubject.next(value);
  }
}
