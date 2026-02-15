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

  @Input() restaurant!: OwnerRestaurant;
  @Output() updateSuccess = new EventEmitter<string>();

  constructor(private ownerService: OwnerService, private cdr: ChangeDetectorRef) {}


  form?: OwnerRestaurant;

  loadForm() {
    this.form = JSON.parse(JSON.stringify(this.restaurant));
    this.cdr.detectChanges();
    console.log("Restaurant Form loaded");
  }

  ngOnInit() {
    this.loadForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('restaurant' in changes && this.restaurant) {
      this.loadForm();
    }
  }

  save(){
    this.ownerService.putRestaurant(this.form!)
      .then( _ => this.updateSuccess.emit("Restaurant Updated"))
  }


}
