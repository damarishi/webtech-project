import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
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
  styleUrl: './owner-restaurant-settings.css',
})
export class OwnerRestaurantSettings implements OnInit{


  constructor( private cdr: ChangeDetectorRef, private ownerService: OwnerService) {}

  protected readonly Object = Object;
  protected readonly settings = Settings;

  mode:Settings = Settings.RESTAURANT;
  loading = true;
  unavailable = false;

  restaurant?: OwnerRestaurant;
  openingTimes?: OwnerOpeningTime[];
  categories?: OwnerCategory[];
  items?: OwnerItem[];
  tags?: OwnerTag[];

  async loadSettings(){
    //Always Load Restaurant
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
          const {categories} = await this.ownerService.getAllCategories();
          this.categories = categories;
          const {items} = await this.ownerService.getAllItems();
          this.items = items;
          const {tags} = await this.ownerService.getAllTags();
          this.tags =tags;
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
    this.loadSettings().then( _=> this.cdr.detectChanges())
  }

  getItemByCategory(category: OwnerCategory){
    return this.items!.filter(item => item.category.category_id === category.category_id) || [];
  }

  drop(event: CdkDragDrop<OwnerCategory[]>){

    moveItemInArray(this.categories!, event.previousIndex, event.currentIndex);

    this.categories!.every((category,index) => category.position = index+1);
    console.log(this.categories!);
    this.cdr.detectChanges();
  }

  saveCategoryPositions(){
    //TODO: DB call save positions
  }
}
