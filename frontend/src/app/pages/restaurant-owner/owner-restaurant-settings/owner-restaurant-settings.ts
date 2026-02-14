import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {OwnerService} from '../../../services/owner-service';
import {OwnerOpeningTime} from '../../../types/owner-opening-time';
import {RestaurantComponent} from '../restaurant-component/restaurant-component';
import {OwnerRestaurant} from '../../../types/owner-restaurant';
import {OpeningTimeCardComponent} from '../opening-time-card-component/opening-time-card-component';
import {FormsModule} from '@angular/forms';
import {OwnerCategory} from '../../../types/owner-category';
import {OwnerItem} from '../../../types/owner-item';

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

  protected readonly Object = Object;
  protected readonly settings = Settings;

  mode:Settings = Settings.RESTAURANT;
  loading = true;
  unavailable = false;

  restaurant?: OwnerRestaurant;
  openingTimes?: OwnerOpeningTime[];
  categories?: OwnerCategory[];
  items?: OwnerItem[];

  async loadSettings(){
    //Always Load Restaurant
    this.loading = true;
    try{
      this.restaurant = await this.ownerService.getRestaurant();
      if(this.restaurant && !this.restaurant.restaurant_id) throw new Error('Restaurant not found');
      switch (this.mode){
        case Settings.RESTAURANT:
          //Nothing else to do
          break;
        case Settings.TIME:
          const {times} = await this.ownerService.getAllTimes();
          this.openingTimes = times;
          break;
        case Settings.ITEMS://Actually Category and Items
          //TODO Fetch Categories
          //TODO Fetch Items and separate in categories
          break;
      }
    }catch(error){
      console.log(error);
      this.unavailable = true;
    }finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }
  ngOnInit() {
    this.loadSettings().then( _=> this.cdr.detectChanges())
  }
}
