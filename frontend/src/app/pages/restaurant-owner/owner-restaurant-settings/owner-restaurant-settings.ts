import {Component, OnInit} from '@angular/core';
import {Weekday} from '../../../types/weekday';
import {NgForm} from '@angular/forms';
import {OwnerService} from '../../../services/owner-service';
import {range} from 'rxjs';
import {OwnerOpeningTime} from '../../../types/owner-opening-time';

@Component({
  selector: 'app-owner-restaurant-settings',
  imports: [],
  templateUrl: './owner-restaurant-settings.html',
  styleUrl: './owner-restaurant-settings.css',
})
export class OwnerRestaurantSettings implements OnInit{

  constructor(/*private form: NgForm,*/ private ownerService: OwnerService) {}
  weekdays =  Weekday;
  dayList:Weekday[] = [1,2,3,4,5,6,7]
  openingTimes: OwnerOpeningTime[] = [];

  ngOnInit() {
    for(let i = 1; i <= 7; i++) console.log(this.weekdays[i]);
  }

  getRestaurant(){

  }

  getTimes(){

  }

  protected readonly Weekday = Weekday;
}
