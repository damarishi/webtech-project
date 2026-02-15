import {ChangeDetectorRef, Component, HostListener, OnInit} from '@angular/core';
import {OwnerService} from '../../../services/owner-service';
import {OwnerOpeningTime} from '../../../types/owner-opening-time';
import {RestaurantComponent} from '../restaurant-component/restaurant-component';
import {OwnerRestaurant} from '../../../types/owner-restaurant';
import {OpeningTimeCardComponent} from '../opening-time-card-component/opening-time-card-component';
import {FormsModule} from '@angular/forms';
import {OwnerCategory} from '../../../types/owner-category';
import {OwnerItem} from '../../../types/owner-item';
import {OwnerTag} from '../../../types/owner-tag';
import {CategoryCardComponent} from '../category-card-component/category-card-component';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';

enum Settings {
  RESTAURANT='Restaurant',
  TIME='Opening Times',
  ITEMS = 'Items'
}

@Component({
  selector: 'app-owner-restaurant-settings',
  imports: [
    FormsModule,
    RestaurantComponent,
    OpeningTimeCardComponent,
    CategoryCardComponent,
    CdkDropList,
    CdkDrag
  ],
  templateUrl: './owner-restaurant-settings.html',
  styleUrls: ['./owner-restaurant-settings.css']
})
export class OwnerRestaurantSettings implements OnInit{


  constructor( private cdr: ChangeDetectorRef, private ownerService: OwnerService) {}

  protected readonly Object = Object;
  protected readonly settings = Settings;
  dropOrientation: 'horizontal' | 'vertical' = 'horizontal';

  mode:Settings = Settings.RESTAURANT;
  loading:boolean = false;
  unavailable = false;

  restaurant?: OwnerRestaurant;
  openingTimes?: OwnerOpeningTime[];
  categories?: OwnerCategory[];
  items?: OwnerItem[];
  tags?: OwnerTag[];

  modalPopUp = false;
  modalMode: 'edit'|'add' = 'edit';

  modalEditItem?:OwnerItem;

  modalAddItem?:OwnerItem;

  @HostListener('window:resize')
  onResize() {
    const mq = window.matchMedia('(max-width: 1000px)');
    this.dropOrientation = mq.matches ? 'vertical' : 'horizontal';
  }

  async loadSettings(){
    this.loading = true;
    try{
      this.restaurant = await this.ownerService.getRestaurant();
      if(this.restaurant && !this.restaurant.restaurant_id) throw new Error('Restaurant not found');
      switch (this.mode){
        case Settings.RESTAURANT:
          //Nothing else to do
          break;
        case Settings.TIME:
          const {times} = await this.ownerService.getAllTimes();
          this.openingTimes = times;
          break;
        case Settings.ITEMS://Category and Items
          const [categoryRes, itemRes, tagsRes] = await Promise.all([
            this.ownerService.getAllCategories(),
            this.ownerService.getAllItems(),
            this.ownerService.getAllTags()
          ])
          this.categories = categoryRes.categories;
          this.items = itemRes.items;
          this.tags = tagsRes.tags;
          break;
      }
    }catch(error){
      console.log(error);
      this.unavailable = true;
    }finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  ngOnInit() {
    this.loadSettings().then( _=> {this.cdr.detectChanges()})
  }

  getItemByCategory(category: OwnerCategory){
    return this.items?.filter(item => item.category.category_id === category.category_id) ?? [];
  }

  drop(event: CdkDragDrop<OwnerCategory[]>){
    moveItemInArray(this.categories!, event.previousIndex, event.currentIndex);
    this.categories!.forEach((category,index) => category.position = index+1);
    this.sortItems();
  }

  sortItems(){
    this.items = this.categories!.flatMap((category) => this.getItemByCategory(category));
    this.items.forEach((item, index) => item.position = index+1);
  }
  saveAllIems(){
    return Promise.allSettled(this.items!.map(item => this.ownerService.putItem(item)));
  }

  saveCategoryPositions(){
    Promise.allSettled(this.categories!.map(category => this.ownerService.putCategory(category)))
      .then(()=>{
          return this.saveItem();
      }).then(_=> {this.loadSettings()})

    console.log(this.categories!);
    console.log(this.items!);
  }

  editItemModal(item:OwnerItem){
    this.modalEditItem = JSON.parse(JSON.stringify(item));
    if(!this.modalEditItem!.item_id){
      console.log("Item Existence Error");
      return;
    }
    this.modalPopUp = true;
    this.modalMode = 'edit';
    this.cdr.detectChanges();
  }

  addItemModal(category:OwnerCategory){
    this.modalAddItem = this.emptyItem();
    this.modalAddItem.category = category;
    this.modalAddItem.position = this.items!.length +1;
    this.modalPopUp = true;
    this.modalMode = 'add';
  }

  closeModal(){
    this.modalPopUp = false;
    this.modalEditItem = undefined;
    this.modalAddItem = undefined;
    this.cdr.detectChanges();
  }

  emptyItem(){
    return {
      item_id:'',
      restaurant_id:this.restaurant!.restaurant_id,
      category: this.categories![0],
      name:"",
      description:"",
      position: 100,
      price: 0,
      images:[],
      tags:[]
    }
  }

  saveItem(){
    this.ownerService.putItem(this.modalEditItem!).then(()=>{
    })
  }

  postItem(){
    this.modalAddItem!.position = this.items!.length+1;
    this.ownerService.postItem(this.modalAddItem!).then(()=>{
      this.sortItems();
      return this.saveAllIems()
    }).then(_=> {
      return this.loadSettings();
    }).then(_=>{this.closeModal()})
  }

  deleteItem(){
    console.log("")
    this.ownerService.deleteItem(this.modalEditItem!.item_id).then(()=>{
      this.closeModal();
    })
  }

  isTagSelected(item:OwnerItem, tag: OwnerTag): boolean {
    return item.tags.some(t => t.tag_id === tag.tag_id);
  }

  toggleTag(item:OwnerItem,tag: OwnerTag) {
    const index= item.tags.findIndex(t => t.tag_id === tag.tag_id);

    if (index > -1) {
      item.tags.splice(index, 1);
    } else {
      item.tags.push(tag);
    }
  }
}
