import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'; 
import { DataService } from '../../../services/data-service';
import { ChangeDetectorRef } from '@angular/core';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './data-view.html',
  styleUrl: './data-view.css',
})
export class DataView {
  //variables used for displaying data
  category: string | null = "";   //category from route parameter
  displayedItems: any[] = []; //data items to display
  isLoading: boolean = false; //loading state
  Object = Object; //to use Object.keys in template

  //modal popup window for creating new item
  isModalOpen: boolean = false;
  newItemData: any = {}; //holds form data for new item

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    //TODO Fabian: Verstehe das noch nicht ganz, besser machen/verstehen
    //sets category var, able to access in html via {{category}}
    /*
      Subscribes to route parameter changes to get the category
      and loads corresponding data
    */
    this.route.paramMap.subscribe(async params => {
      this.category = params.get('category');
      
      if(this.category) {
        await this.loadData(this.category);
      }
    });
  }

  /*
    Fetches data from fetch-data-service based on category
  */
  async loadData(category: string) {
    this.isLoading = true;
    try {
      this.displayedItems = await this.dataService.fetchData(category);
      if(this.displayedItems === null) throw new Error("No data received");
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges(); //forces render update
    }
  }

  //create new item (opens modal)
  async onCreateItem() {
    const newItem = {
      // Define the structure of the new item based on your requirements
      name: 'New Item',
      description: 'Description of the new item'
    };
    try {
      
    } catch (error) {
      
    }
  }


  //open modal window form for creating new item
  openModal() {
    //initialize modal form fields here
    
    //TODO Fabian: need DTOs to create new Item properly
  }
}


