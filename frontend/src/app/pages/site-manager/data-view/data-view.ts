import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'; 
import { DataService } from '../../../services/data-service';
import { ChangeDetectorRef } from '@angular/core';

import { FormsModule } from '@angular/forms';


const CATEGORY_FIELDS: Record<string, string[]> = {
  'restaurants': ['restaurant_name', 'address', 'cuisine_type'],
  'restaurant_requests': ['restaurant_name', 'requested_by', 'requested_at', 'admin_notes'],
  'users': ['username', 'email', 'full_name', 'role']
};

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

  //display filtered restaurant requests
  //1 = pending, 2 = accepted, 3 = rejected
  filterStatus: 1 | 2 | 3 = 1;

  //modal popup window for creating new item
  isModalOpen: boolean = false;
  modalMode: 'create' | 'edit' | 'delete' | 'approve' | 'reject' = 'create'; //modal mode, Union type with initial value
  selectedItem: any = {}; // handles Create, Edit, and Delete
  modalFields: string[] = []; //fields to display in modal form, only used for create/edit


  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
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
    Since the data items may not have a consistent 'id' field,
    this function attempts to find a key that can serve as a unique identifier.
    It looks for any key that ends with 'id' or is exactly 'id'.
    If none is found, it falls back to using the index.
  */
  trackById(index: number, item: any): any {
    const idKey = Object.keys(item).find(key => key.toLowerCase().endsWith('id'));
    return idKey ? item[idKey] : index; 
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

  /*
    Posts data to backend based on category
  */
  async createNewData(category: string, itemData: any) {
    try {
      const response = await this.dataService.postData(category, itemData);
      if(response === null) throw new Error("No response received");  //throw error if no response
      console.log('Data posted successfully:', response);
    } catch (error) {
      console.error('Error posting data:', error);
    } finally {
      this.cdr.detectChanges(); //forces render update
    }
  }

  // #### Basic Create, Edit, Delete Functionality ####
  //create new item (opens modal)
  async onCreateItem() {
    try {
      let fields: string[] = [];
      switch(this.category) {
        case "restaurant_requests":
          fields = CATEGORY_FIELDS['restaurant_requests'];
          break;  
        case "restaurants":
          fields = CATEGORY_FIELDS['restaurants'];
          break;
        case "users":
          fields = CATEGORY_FIELDS['users'];
          break;
        default:
          throw new Error("Unknown category for creating item");
      }

      let newItem: any = {};
      for (const field of fields) {
        newItem[field] = '';
      }
      this.openModal('create', newItem, fields);
    } catch (error) {
      console.error('Error creating new item:', error);
    }
  }

  //edit item (opens modal)
  async onEditItem(item: any) {
    //TODO Fabian: implement edit functionality
    this.openModal('edit', item);
  }

  //delete item (opens modal)
  async onDeleteItem(item: any) {
    //TODO Fabian: implement delete functionality
    this.openModal('delete', item);
  }


  // #### Case Specific Functionality (Restaurant Requests Approval, etc) ####
  //approve request (opens modal)
  async onApproveRequest(item: any) {
    //TODO Fabian: implement approve functionality for restaurant requests
    this.openModal('approve', item);
  }

  //reject request (opens modal)
  async onRejectRequest(item: any) {
    //TODO Fabian: implement reject functionality for restaurant requests
    this.openModal('reject', item);
  }



  //open modal window form for creating new item
  openModal(mode: 'create' | 'edit' | 'delete' | 'approve' | 'reject', item: any = {}, fields?: string[]) {
    //initialize modal form fields here
    this.modalMode = mode;
    this.selectedItem = { ...item };  //shallow copy to avoid direct changes
    this.modalFields = fields || Object.keys(item); //set modal fields

    this.isModalOpen = true;
  }

  //reset modal state
  closeModal() {
    this.isModalOpen = false;
    //this.selectedItem = {};
    this.modalFields = [];
  }

  //confirm modal action (create/edit/delete)
  //specifically important for edit and delete functionality
  async confirmModal() {
    //TODO Fabian: implement create/edit/delete functionality based on modalMode
    try {
      this.isLoading = true;
      const dataToSave = { ...this.selectedItem }; //shallow copy of selected item data
      const currentCategory = this.category!; //store current category, category can never be null here since it is page dependent
      const currentModalMode = this.modalMode; //store current modal mode
      
      
      
      this.closeModal();
      this.isLoading = true;

      switch(currentModalMode) {
        case 'create':
          console.log('Creating item:', this.selectedItem);
          await this.createNewData(currentCategory, dataToSave);
          break;
        case 'edit':
          console.log('Editing item:', this.selectedItem);
          await this.dataService.updateData(currentCategory, dataToSave);
          break;
        case 'delete':
          console.log('Deleting item:', this.selectedItem);
          break;
        case 'approve':
          console.log('Approving item:', this.selectedItem);
          await this.dataService.approveRequest(currentCategory, dataToSave);
          break;
        case 'reject':
          console.log('Rejecting item:', this.selectedItem);
          await this.dataService.rejectRequest(currentCategory, dataToSave);
          break;
      }
  
      
      //reload data after operation  
        
      await this.loadData(currentCategory); 
        
 
    }
    catch (error) {
      console.error(`Error during ${this.modalMode} operation:`, error);
    }
    finally {
      this.isLoading = false;
      this.cdr.detectChanges(); //forces render update
    }
  }

  setFilter(status: 1 | 2 | 3) {
    this.filterStatus = status;   
  }
}


