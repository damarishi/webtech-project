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

//display filter options based on category
const FILTERS: Record<string, { label: string, value: any }[]> = {
  'restaurant_requests': [
    { label: 'Pending', value: 1 },
    { label: 'Accepted', value: 2 },
    { label: 'Rejected', value: 3 }
  ],
  'users': [
    { label: 'Active Users', value: false }, // mapping to is_deleted = false
    { label: 'Deleted Users', value: true }  // mapping to is_deleted = true
  ]
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
  Object = Object; //to use Object.keys in html for dynamic display


  //Filter Settings
  /*current filter status
    Possible Values:
    For restaurant_requests: 1 (Pending), 2 (Accepted), 3 (Rejected)
    For users: false (Active Users), true (Deleted Users)
  */
  filterStatus: any = 1; // Default filter value

  // Get filters for the current category
  get currentFilters() {
    return this.category ? FILTERS[this.category] : [];
  }

  // Update setFilter to handle the default filter when switching categories
  setFilter(value: any) {
    this.filterStatus = value;
  }

  // Helper function to determine if an item should be shown based on the current filter
  shouldShowItem(item: any): boolean {
    if (this.category === 'restaurant_requests') {
      // Check if the item's request status matches our filter
      return item.status_id === this.filterStatus;
    }
    if (this.category === 'users') {
      // Check if the user's is_deleted matches our filter (true/false)
      return item.is_deleted === this.filterStatus;
    }
    return true; // Show all for other categories
  }


  //Modal Settings
  //modal popup window for creating new item
  isModalOpen: boolean = false;
  modalMode: 'create' | 'edit' | 'delete' | 'approve' | 'reject' | 'warnUser' | 'banUser' = 'create'; //modal mode, Union type with initial value
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
        this.setDefaultFilter(this.category); //set default filter based on category
        await this.loadData(this.category);
      }
    });
  }

  //sets default filter based on category when the page is loaded (first filter option)
  private setDefaultFilter(category: string) {
    if(this.category && FILTERS[this.category] && FILTERS[this.category].length > 0 ) {
      this.filterStatus = FILTERS[this.category][0].value; //set to first filter option
    } else {
      this.filterStatus = null; //no filter, should never happen
    }
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

  //TODO Fabian: maybe i'll just change function call to immediatly open modal with keywords
  //edit item (opens modal)
  async onEditItem(item: any) {
    this.openModal('edit', item);
  }

  //delete item (opens modal)
  async onDeleteItem(item: any) {
    this.openModal('delete', item);
  }

  // #### Case Specific Functionality (Restaurant Requests Approval, etc) ####
  //approve request (opens modal)
  async onApproveRequest(item: any) {
    this.openModal('approve', item);
  }

  //reject request (opens modal)
  async onRejectRequest(item: any) {
    this.openModal('reject', item);
  }

  // Warn User and Ban User functions for user_moderation category
  async onWarnUser(item: any) {
    this.openModal('warnUser', item);
  }
  async onBanUser(item: any) {
    this.openModal('banUser', item);
  }



  //open modal window form for creating new item
  openModal(mode: 'create' | 'edit' | 'delete' | 'approve' | 'reject' | 'warnUser' | 'banUser', item: any = {}, fields?: string[]) {
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
          if(this.category === 'users' && this.filterStatus === true)
          {
            console.log('Permanently Purging user:', this.selectedItem);
            await this.dataService.deleteData(currentCategory, dataToSave);
            break;
          }
          else {
            console.log('Marking item as deleted:', this.selectedItem);
            await this.dataService.updateData(currentCategory, dataToSave);
            break;
          }
          break;
        case 'approve':
          console.log('Approving item:', this.selectedItem);
          await this.dataService.approveRequest(currentCategory, dataToSave);
          break;
        case 'reject':
          console.log('Rejecting item:', this.selectedItem);
          await this.dataService.rejectRequest(currentCategory, dataToSave);
          break;
        case 'warnUser':
          console.log('Warning user:', this.selectedItem);
          await this.dataService.updateData(currentCategory, dataToSave);  //TODO Fabian: implement warn user functionality in backend
          break;
        case 'banUser':
          console.log('Banning user:', this.selectedItem);
          await this.dataService.updateData(currentCategory, dataToSave); //TODO Fabian: implement ban user functionality in backend
          break;
        default:
          throw new Error("Unknown modal mode");
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
}


