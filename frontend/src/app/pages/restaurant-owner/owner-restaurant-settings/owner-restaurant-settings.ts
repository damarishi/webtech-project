import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {OwnerService} from '../../../services/owner-service';
import {OwnerOpeningTime} from '../../../types/owner-opening-time';
import {RestaurantComponent} from '../restaurant-component/restaurant-component';
import {OwnerRestaurant} from '../../../types/owner-restaurant';
import {OpeningTimeCardComponent} from '../opening-time-card-component/opening-time-card-component';
import {FormsModule} from '@angular/forms';

enum Settings {
  RESTAURANT='Restaurant',
  TIME='Opening Times',
  ITEMS = 'Items'
}

@Component({
  selector: 'app-owner-restaurant-settings',
  imports: [
    FormsModule,
    RestaurantComponent,
    OpeningTimeCardComponent
  ],
  templateUrl: './owner-restaurant-settings.html',
  styleUrl: './owner-restaurant-settings.css',
})
export class OwnerRestaurantSettings implements OnInit{


  constructor( private cdr: ChangeDetectorRef, private ownerService: OwnerService) {}

  protected readonly settings = Settings;

  mode:Settings = Settings.RESTAURANT;

  restaurant: Promise<OwnerRestaurant> | undefined;
  openingTimes?: Promise<{ times: OwnerOpeningTime[] }>;

  loadSettings(){
    switch (this.mode){
      case Settings.RESTAURANT:
        this.getRestaurant();
        console.log("Loading Restaurant Settings");
        break;
      case Settings.TIME:
        this.getTimes();
        console.log("Loading Opening Times");
        break;
      case Settings.ITEMS:
        console.log("Loading Items and Dishes");
        break;
    }
  }


  ngOnInit() {
    this.loadSettings();
  }

  getRestaurant(){
    this.restaurant = this.ownerService.getRestaurant();
  }

  getTimes(){
    this.openingTimes = this.ownerService.getAllTimes();
  }

  getItems(){

  }

  protected readonly Object = Object;
}
