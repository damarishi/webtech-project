import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {User} from '../../../types/user';
import {OwnerRestaurant} from '../../../types/owner-restaurant';
import {OwnerService} from '../../../services/owner-service';

@Component({
  selector: 'owner-restaurant-component',
  standalone: true,
    imports: [
        FormsModule
    ],
  templateUrl: './restaurant-component.html',
  styleUrl: './restaurant-component.css',
})
export class RestaurantComponent implements OnInit{

  @Input() restaurant: Promise<OwnerRestaurant> | undefined;
  @Output() updateSuccess = new EventEmitter<string>();

  constructor(private ownerService: OwnerService, private cdr: ChangeDetectorRef) {}

  form: OwnerRestaurant | undefined;

  loadForm(res:OwnerRestaurant) {
    this.form = JSON.parse(JSON.stringify(res));
  }

  ngOnInit() {
    this.restaurant!.then( res => {
      this.loadForm(res);
      this.cdr.detectChanges();
      console.log("loaded");
    })
  }


  save(){
    this.ownerService.putRestaurant(this.form!)
  }


}
