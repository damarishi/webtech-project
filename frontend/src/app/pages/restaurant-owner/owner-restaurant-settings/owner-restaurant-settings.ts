import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Weekday} from '../../../types/weekday';
import {FormsModule, NgForm} from '@angular/forms';
import {OwnerService} from '../../../services/owner-service';
import {range} from 'rxjs';
import {OwnerOpeningTime} from '../../../types/owner-opening-time';
import {AsyncPipe} from '@angular/common';
import {MatFormField, MatLabel} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {UserRoles} from '../../../types/user-roles';
import {RestaurantComponent} from '../restaurant-component/restaurant-component';
import {OwnerRestaurant} from '../../../types/owner-restaurant';

enum Settings {
  RESTAURANT='Restaurant',
  TIME='Opening Times',
  ITEMS = 'Items'
}

@Component({
  selector: 'app-owner-restaurant-settings',
  imports: [
    AsyncPipe,
    FormsModule,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    RestaurantComponent
  ],
  templateUrl: './owner-restaurant-settings.html',
  styleUrl: './owner-restaurant-settings.css',
})
export class OwnerRestaurantSettings implements OnInit{


  constructor( private cdr: ChangeDetectorRef, private ownerService: OwnerService) {}

  protected readonly settings = Settings;

  mode:Settings = Settings.RESTAURANT;

  restaurant: Promise<OwnerRestaurant> | undefined;

  weekdays =  Weekday;

  dayList:Weekday[] = [1,2,3,4,5,6,7]
  openingTimes: OwnerOpeningTime[] = [];


  loadSettings(){
    switch (this.mode){
      case Settings.RESTAURANT:
        this.getRestaurant();
        console.log("Loading Restaurant Settings");
        break;
      case Settings.TIME:
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

  }

  getItems(){

  }
  protected readonly Weekday = Weekday;
  protected readonly UserRoles = UserRoles;
  protected readonly Object = Object;
}
