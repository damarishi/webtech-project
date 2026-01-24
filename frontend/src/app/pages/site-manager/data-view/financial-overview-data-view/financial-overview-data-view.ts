import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'; 
import { FormsModule } from '@angular/forms';
import { DataService } from '../../../../services/data-service';

type DbOrder = [number, number, number, number, number, number, number, string | Date];

@Component({
  selector: 'app-financial-overview-data-view',
  imports: [CommonModule, FormsModule],
  templateUrl: './financial-overview-data-view.html',
  styleUrl: './financial-overview-data-view.css',
})


export class FinancialOverviewDataView {
  
  category: any = 'financial_overiew';
  //CATEGORY_FIELDS: any[] = ['order_id', 'restaurant_id', 'user_id','total', 'discount_id', 'status', 'fee'];
  // Define filters if needed, e.g. active/markedAsDeleted restaurants

  modalMode: 'create' | 'edit' | 'delete' = 'create';

  loadedItems: any = [];
  summaryTotalOrders: number = 0;
  summaryRevenue: number = 0;
  summaryAverageOrderPrice: number = 0;
  //summaryThisMonthOrderCount: number = 0;


  Object = Object; //to use Object.keys in html for dynamic display
  isModalOpen: boolean = false;
  isLoading: boolean = false;

  
  
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    await this.loadData('orders');
  }


  async loadData(category: string) {
    this.isLoading = true;
    try {
      this.loadedItems = await this.dataService.fetchData(category);
      if(this.loadedItems === null) throw new Error("No data received");


      this.calculateSummary();




    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges(); //forces render update
    }
  }

  async calculateSummary() {
    this.summaryTotalOrders = this.loadedItems.length;
    this.summaryRevenue = 0;
    this.summaryAverageOrderPrice = 0;
    //this.summaryThisMonthOrderCount = 0;
    this.loadedItems.array.forEach((order: DbOrder) => {
      this.summaryRevenue += order[6];    //.fee
      this.summaryAverageOrderPrice += order[4] + order[6]; //total + fee?
      //this.summaryThisMonthOrderCount = 0;
    });
    this.summaryAverageOrderPrice /= this.summaryTotalOrders;

  }

  trackById(index: number, item: any): any {
    const idKey = Object.keys(item).find(key => key.toLowerCase().endsWith('id'));
    return idKey ? item[idKey] : index; 
  }

}


