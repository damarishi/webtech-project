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
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {OwnerItem} from '../../../types/owner-item';
import {OwnerService} from '../../../services/owner-service';
import {OwnerCategory} from '../../../types/owner-category';
import {FormsModule} from '@angular/forms';
import {OwnerTag} from '../../../types/owner-tag';

@Component({
  selector: 'category-card-component',
  standalone: true,
  imports: [
    CdkDropList,
    CdkDrag,
    FormsModule
  ],
  templateUrl: './category-card-component.html',
  styleUrl: './category-card-component.css',
})
export class CategoryCardComponent implements OnInit, OnChanges {

  @Input() category!:OwnerCategory;
  @Input() items!:OwnerItem[];
  @Input() tags!:OwnerTag[];
  @Output() updateSuccess = new EventEmitter<string>();

  constructor(private ownerService: OwnerService, private cdr: ChangeDetectorRef) {}

  categoryForm!:OwnerCategory;
  itemsForm!:OwnerItem[];
  tagsForm!:OwnerTag[];

  positions!:number[];

  loadData(){
    this.categoryForm = JSON.parse(JSON.stringify(this.category));
    this.itemsForm = JSON.parse(JSON.stringify(this.items));
    this.tagsForm = JSON.parse(JSON.stringify(this.tags));
    this.positions = this.items.map(item => item.position);
  }


  ngOnInit(){
    this.loadData();
  }

  ngOnChanges(changes: SimpleChanges) {
    /*
    if('items' in changes && this.items) {
      this.loadData();
      console.log("hello");
    }

     */
  }

  drop(event: CdkDragDrop<OwnerItem[]>){

    moveItemInArray(this.itemsForm, event.previousIndex, event.currentIndex);

    this.itemsForm.every((item,index) => item.position = this.positions[index]);
    console.log(this.itemsForm);
  }

  savePositions(){
    console.log(this.itemsForm);
    Promise.all(this.itemsForm.map(item => this.ownerService.putItem(item)))
      .then( _ =>{
          console.log("Done");
          //this.updateSuccess.emit(`Item Positions Saved`);
      })
  }


}
