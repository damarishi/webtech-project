import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {FormsModule} from "@angular/forms";
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
export class RestaurantComponent implements OnInit, OnChanges{

  @Input() restaurant: Promise<OwnerRestaurant> | undefined;
  @Output() updateSuccess = new EventEmitter<string>();

  constructor(private ownerService: OwnerService, private cdr: ChangeDetectorRef) {}


  form: OwnerRestaurant | undefined;
  requestPending = false;

  loadForm(res:OwnerRestaurant) {
    if(!res.restaurant_id){
      console.log("No Restaurant to load");
      this.requestPending = true;
      this.cdr.detectChanges();
      return;
    }
    this.form = JSON.parse(JSON.stringify(res));
    this.cdr.detectChanges();
    console.log("Restaurant loaded");
  }

  ngOnInit() {
    this.restaurant!.then( res => {
      this.loadForm(res);
    }).catch(_ => this.requestPending = true)
  }

  ngOnChanges(changes: SimpleChanges) {
    if('restaurant' in changes && this.restaurant) {
      this.restaurant.then( res => {
        this.loadForm(res);
      }).catch(_ => this.requestPending = true)
    }
  }

  save(){
    this.ownerService.putRestaurant(this.form!)
      .then( _ => this.updateSuccess.emit("Restaurant Updated"))
  }


}
