import {ChangeDetectorRef, Component} from '@angular/core';
import {OwnerService} from '../../../services/owner-service';

@Component({
  selector: 'app-item-card-component',
  imports: [],
  templateUrl: './item-card-component.html',
  styleUrl: './item-card-component.css',
})
export class ItemCardComponent {

  constructor(private ownerService: OwnerService, private cdr: ChangeDetectorRef) {}

  modalPopUp = false;


  openModal(){
    this.modalPopUp = true;
    this.cdr.detectChanges();
  }

  saveChanges(){
    console.log("todo");
  }

  closeModal(){
    this.modalPopUp = false;
    this.cdr.detectChanges();
  }
}
