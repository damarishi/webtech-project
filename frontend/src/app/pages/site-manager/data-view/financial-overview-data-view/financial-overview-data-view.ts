import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'; 
import { FormsModule } from '@angular/forms';
import { DataService } from '../../../../services/data-service';
import { Navbar } from '../../../../shared/ui/navbar/navbar';
import { RouterModule } from '@angular/router';

type DbOrder = [number, number, number, number, number, number, number, string | Date];

@Component({
  selector: 'app-financial-overview-data-view',
  imports: [CommonModule, FormsModule, Navbar, RouterModule],
  templateUrl: './financial-overview-data-view.html',
  styleUrl: './../base-data-view.css',
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

  summaryLast30DaysOrderCount: number = 0;
  summaryLast30DaysRevenue: number = 0;
  summaryLast30DaysAverageOrderPrice: number = 0;

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
    this.summaryLast30DaysOrderCount = 0;
    

    let currentDate = new Date();
    let thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(currentDate.getDate() - 30);

    console.log(currentDate, thirtyDaysAgo);
    
    this.loadedItems.forEach((order: any) => {
      console.log(order.date);
      this.summaryRevenue += order.fee;    //.fee
      this.summaryAverageOrderPrice += order.fee + Number(order.total); //total + fee?
      if (new Date(order.date) > thirtyDaysAgo && new Date(order.date) <= currentDate) {
        this.summaryLast30DaysOrderCount++;
        this.summaryLast30DaysRevenue += order.fee;
        this.summaryLast30DaysAverageOrderPrice += order.fee + Number(order.total);
      }
    });
    this.summaryAverageOrderPrice /= this.summaryTotalOrders;

  }

  trackById(index: number, item: any): any {
    const idKey = Object.keys(item).find(key => key.toLowerCase().endsWith('id'));
    return idKey ? item[idKey] : index; 
  }

}


