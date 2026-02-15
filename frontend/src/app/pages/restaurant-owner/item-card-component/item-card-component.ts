import {ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {OwnerItem} from '../../../types/owner-item';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';


@Component({
  selector: 'item-card-component',
  imports: [
    MatIconButton,
    MatIcon
  ],
  templateUrl: './item-card-component.html',
  styleUrl: './item-card-component.css',
})
export class ItemCardComponent {

  constructor(private cdr: ChangeDetectorRef) {}

  @Input() item!:OwnerItem;
  @Output() itemChange = new EventEmitter<OwnerItem>();

  propagateEditScreen(){
    this.itemChange.emit(this.item);
    this.cdr.detectChanges();
  }
}
