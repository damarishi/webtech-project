import {Component, EventEmitter, Input, Output} from '@angular/core';
import {OwnerOrder} from '../../../types/owner-order';
import {OrderStatus} from '../../../types/order-status';
import {OwnerService} from '../../../services/owner-service';

@Component({
  selector: 'order-card-component',
  standalone: true,
  imports: [],
  templateUrl: './order-card-component.html',
  styleUrl: './order-card-component.css',
})
export class OrderCardComponent {
  @Input() order: OwnerOrder | undefined;

  @Output() updateSuccess = new EventEmitter<string>();

  constructor(private ownerService: OwnerService) {}

  formatStatus(status:number|undefined) {
    if (status) {
      return OrderStatus[status];
    }
    return '';
  }
  formatDate(date: string | Date): string {
    if(!date) return '';
    return new Date(date).toLocaleString(); // readable format
  }

  get totalPrice(): number {
    return this.order!.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }

  acceptOrder(){
    if(this.order){
      this.order.status = 1;
      this.save();
    }
  }

  rejectOrder(){
    if(this.order){
      this.order.status = -2;
      this.save();
    }
  }

  updateOrderStatus() {
    if(this.order){
      if(this.order.status >= 3) this.order.status = -1;
      else this.order.status++;
      this.save();
    }
  }

  save(){
    this.ownerService.putOrder(this.order!).then( _ =>{
      this.updateSuccess.emit(this.order!.order_id);
    }).catch(_=> {
      if(this.order) {
        this.order.status--;
      }
    });
  }
}
