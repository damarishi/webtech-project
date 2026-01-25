import {Component, Input} from '@angular/core';
import {OwnerOrder} from '../../../types/owner-order';

@Component({
  selector: 'order-card-component',
  standalone: true,
  imports: [],
  templateUrl: './order-card-component.html',
  styleUrl: './order-card-component.css',
})
export class OrderCardComponent {
  @Input() order: OwnerOrder | undefined;

  formatDate(date: string | Date): string {
    if(!date) return '';
    return new Date(date).toLocaleString(); // readable format
  }

  get totalPrice(): number {
    return this.order!.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }
}
