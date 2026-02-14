import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {OwnerItem} from '../../../types/owner-item';
import {OwnerService} from '../../../services/owner-service';
import {OwnerCategory} from '../../../types/owner-category';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-category-card-component',
  standalone: true,
  imports: [
    CdkDropList,
    CdkDrag,
    FormsModule
  ],
  templateUrl: './category-card-component.html',
  styleUrl: './category-card-component.css',
})
export class CategoryCardComponent implements OnInit{

  @Input() category!:OwnerCategory;
  @Input() items!:OwnerItem[];
  @Output() updateSuccess = new EventEmitter<string>();

  constructor(private ownerService: OwnerService, private cdr: ChangeDetectorRef) {}

  categoryForm!:Partial<OwnerCategory>;

  modalPopUp = false

  ngOnInit(){
    this.categoryForm = JSON.parse(JSON.stringify(this.category));
  }

  drop(event: CdkDragDrop<OwnerItem[]>){
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }

  openModal(){
    this.modalPopUp = true;
    this.cdr.detectChanges();
  }

  closeModal(){
    this.modalPopUp = false;
    this.cdr.detectChanges();
  }

}
