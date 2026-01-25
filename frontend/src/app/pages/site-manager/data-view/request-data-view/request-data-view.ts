import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'; 
import { FormsModule } from '@angular/forms';
import { DataService } from '../../../../services/data-service';
import { Navbar } from '../../../../shared/ui/navbar/navbar';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-request-data-view',
  imports: [CommonModule, FormsModule, Navbar, RouterModule],
  standalone: true,
  templateUrl: './request-data-view.html',
  styleUrl: './../base-data-view.css',
})

export class RequestDataView {

  category: any = 'restaurant_requests';
  CATEGORY_FIELDS: any[] = ['restaurant_name', 'requested_by','requested_at', 'status_id', 'location'];
  // Define filters if needed, e.g. active/markedAsDeleted restaurants
  filters: {label: string, value: any}[] = 
  [ 
    {label: 'pending', value: 1},
    {label: 'approved', value: 2},
    {label: 'rejected', value: 3},

  ];   //no filters for restaurant data view
  currentFilter = null;

  modalMode: 'create' | 'approve' | 'reject' = 'create';

  loadedItems: any = [];
  filteredItems: any = [];

  selectedItem: any = {};

  Object = Object; //to use Object.keys in html for dynamic display
  isModalOpen: boolean = false;
  isLoading: boolean = false;

  
  
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.currentFilter = this.filters[0].value;
    await this.loadData(this.category);
  }




  // #### Basic Create, Edit, Delete Functionality ####
  //create new item (opens modal)
  async onCreateItem() {
    try {
      console.log('Creating new item for category:', this.category);
      console.log('Creating new item with fields:', this.CATEGORY_FIELDS);
      let newItem: any = {};
      for (const field of this.CATEGORY_FIELDS) {
        newItem[field] = '';
      }
      this.openModal('create', newItem, this.CATEGORY_FIELDS);
    } catch (error) {
      console.error('Error creating new item:', error);
    }
  }

  //TODO Fabian: maybe i'll just change function call to immediatly open modal with keywords
  //edit item (opens modal)
  async onApproveItem(item: any) {
    this.openModal('approve', item);
  }

  //delete item (opens modal)
  async onRejectItem(item: any) {
    this.openModal('reject', item);
  }


  //open modal window form for creating new item
  openModal(mode: 'create' | 'approve' | 'reject' , item: any = {}, fields?: string[]) {
    //initialize modal form fields here
    this.modalMode = mode;
    this.selectedItem = { ...item };  //shallow copy to avoid direct changes

    if ((mode === 'reject' || mode === 'approve') && this.selectedItem.location && typeof this.selectedItem.location === 'object') {
        const loc = this.selectedItem.location;
        this.selectedItem.location = `(${loc.x},${loc.y})`;
    }

    this.isModalOpen = true;
  }

  //reset modal state
  closeModal() {
    this.isModalOpen = false;
    //this.selectedItem = {};

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

      switch (currentModalMode) {
        case 'create':
          console.log('Creating item in category:', currentCategory, 'with data:', dataToSave);
          await this.dataService.postData(currentCategory, dataToSave);
          break;
        case 'approve':
          console.log('Approving request in category:', currentCategory, 'with data:', dataToSave);
          await this.dataService.approveRequest(currentCategory, dataToSave);
          break;
        case 'reject':
          console.log('Rejecting request in category:', currentCategory, 'with data:', dataToSave);
          await this.dataService.rejectRequest(currentCategory, dataToSave);
          break;
        default:
          throw new Error(`Unknown modal mode: ${currentModalMode}`);
      }



      //reload data after operation  
        
      await this.loadData(this.category); 
        
 
    }
    catch (error) {
      console.error(`Error during ${this.modalMode} operation:`, error);
    }
    finally {
      this.isLoading = false;
      this.cdr.detectChanges(); //forces render update
    }
  }

  async setFilter(filter: any)
  {
    this.currentFilter = filter;
    this.filterItems();

  }

  filterItems()
  {
    if(this.currentFilter === null)
    { 
      this.filteredItems = this.loadedItems;
    }
    this.filteredItems = this.loadedItems.filter( (item: any) => {
      return item.status_id === this.currentFilter;
    });
  }

  async loadData(category: string) {
    this.isLoading = true;
    try {
      this.loadedItems = await this.dataService.fetchData(category);
      if(this.loadedItems === null) throw new Error("No data received");

      this.filterItems();

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges(); //forces render update
    }
  }

  trackById(index: number, item: any): any {
    const idKey = Object.keys(item).find(key => key.toLowerCase().endsWith('id'));
    return idKey ? item[idKey] : index; 
  }

  isObject(val: any): boolean {
    return val !== null && typeof val === 'object' && !Array.isArray(val);
  }

}


