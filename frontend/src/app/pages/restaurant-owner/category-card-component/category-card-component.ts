import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {OwnerItem} from '../../../types/owner-item';
import {OwnerService} from '../../../services/owner-service';
import {OwnerCategory} from '../../../types/owner-category';

@Component({
  selector: 'app-category-card-component',
  standalone: true,
  imports: [
    CdkDropList,
    CdkDrag
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

  ngOnInit(){
    this.categoryForm = JSON.parse(JSON.stringify(this.category));
  }

  drop(event: CdkDragDrop<OwnerItem[]>){
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }

}
