import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'; 
import { FormsModule } from '@angular/forms';
import { DataService } from '../../../../services/data-service';

@Component({
  selector: 'app-logs-data-view',
  imports: [CommonModule, FormsModule],
  templateUrl: './logs-data-view.html',
  styleUrl: './logs-data-view.css',
})
export class LogsDataView {

  category: any = 'logs';
  CATEGORY_FIELDS: any[] = ['id', 'description', 'typeoflog'];
  // Define filters if needed, e.g. active/markedAsDeleted restaurants

  modalMode: 'create' | 'edit' | 'delete' = 'create';

  loadedItems: any = [];

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
  async onEditItem(item: any) {
    this.openModal('edit', item);
  }

  //delete item (opens modal)
  async onDeleteItem(item: any) {
    this.openModal('delete', item);
  }


  //open modal window form for creating new item
  openModal(mode: 'create' | 'edit' | 'delete' , item: any = {}, fields?: string[]) {
    //initialize modal form fields here
    this.modalMode = mode;
    this.selectedItem = { ...item };  //shallow copy to avoid direct changes

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
          console.log('Creating Settings in category:', currentCategory, 'with data:', dataToSave);
          await this.dataService.postData(currentCategory, dataToSave);
          break;
        case 'edit':
          console.log('Editing Settings in category:', currentCategory, 'with data:', dataToSave);
          await this.dataService.updateData(currentCategory, dataToSave);
          break;
        case 'delete':
          console.log('Deleting Settings in category:', currentCategory, 'with data:', dataToSave);
          await this.dataService.deleteData(currentCategory, dataToSave);
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


  async loadData(category: string) {
    this.isLoading = true;
    try {
      this.loadedItems = await this.dataService.fetchData(category);
      if(this.loadedItems === null) throw new Error("No data received");



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

}


