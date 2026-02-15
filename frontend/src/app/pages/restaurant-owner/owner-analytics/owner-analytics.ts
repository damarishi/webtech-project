import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ChartData, ChartOptions} from 'chart.js';
import {OwnerOrder} from '../../../types/owner-order';
import {OwnerService} from '../../../services/owner-service';
import {OwnerOrderItem} from '../../../types/owner-order-item';
import {BaseChartDirective} from 'ng2-charts';
import {CurrencyPipe, SlicePipe} from '@angular/common';

@Component({
  selector: 'app-owner-analytics',
  imports: [
    BaseChartDirective,
    CurrencyPipe,
    SlicePipe
  ],
  templateUrl: './owner-analytics.html',
  styleUrl: './owner-analytics.css',
})
export class OwnerAnalytics implements OnInit {

  loading = false;
  unavailable = false;


  orders?: OwnerOrder[];

  totalRevenue?: number;
  dailyOrders?: { day:string, count:number }[];
  weeklyOrders?: { week:string, count:number }[];
  topItems?: {item:OwnerOrderItem, count:number}[];

  public dailyChartData: ChartData<'bar'> = {
    labels: [], datasets: [{ data: [], label: 'Orders per Day', backgroundColor: '#1D902E' }]
  };

  public weeklyChartData: ChartData<'bar'> = {
    labels: [], datasets: [{ data: [], label: 'Orders per Week', backgroundColor: '#1D902E' }]
  };

  public chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: { legend: { display: true } }
  };

  constructor(private ownerService: OwnerService, private cdr: ChangeDetectorRef) {}

  loadOrders(){
    this.loading = true;
    this.ownerService.getAllOrders()
      .then(data =>{
        this.orders = data.orders.filter(order => order.status === -1);
        console.log(this.orders);
        return this.setTopItems();
      })
      .then(()=>{
        return Promise.allSettled([
          this.setDailyOrders(),
          this.setWeeklyOrders(),
          this.setRevenue()])
      }).then(() =>{
        if(this.dailyOrders){
          this.dailyChartData = {
            ...this.dailyChartData,
            labels: this.dailyOrders.map(d=>d.day),
            datasets: [{...this.dailyChartData.datasets[0], data: this.dailyOrders.map(d => d.count)}]
          }
        }
        if(this.weeklyOrders){
          this.weeklyChartData = {
            ...this.weeklyChartData,
            labels: this.weeklyOrders.map(w=>w.week),
            datasets: [{...this.weeklyChartData.datasets[0], data: this.weeklyOrders.map(w=>w.count)}]
          }
        }
      }
    )
      .catch(error =>{
        console.log(error);
        this.unavailable = true;
      })
      .finally( ()=> {
        this.loading = false;
        this.cdr.detectChanges()
      });
  }

  ngOnInit() {
    this.loadOrders();
  }

  async setDailyOrders() {
     const dailyRecord= this.orders!.reduce((acc,order) =>{
      const d = new Date(order.date);
      const key = d.toISOString().slice(0,10);

      acc[key] = (acc[key]||0)+1;
      return acc;
    },{} as Record<string, number>);

    this.dailyOrders = Object.entries(dailyRecord)
      .map(([day,count])=> ({day,count}))
      .sort((a,b)=> a.day.localeCompare(b.day));
  }

  // Source - https://stackoverflow.com/a/6117889, Posted by RobG
  // Retrieved 2026-02-15, License - CC BY-SA 4.0
  //Modified to for TS
  getWeekNumber(date:Date) {
    // Copy date so don't modify original
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    // Return array of year and week number
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  }

  async setWeeklyOrders() {
     const weeklyRecord= this.orders!.reduce((acc,order)=>{
       const d = new Date(order.date);

       const week = this.getWeekNumber(d);
       const weekString = week.toString().padStart(2, '0');
       const key = `${d.getFullYear()}-W${weekString}`;
       acc[key] = (acc[key]||0)+1;
       return acc;
    },{} as Record<string,number>)

    this.weeklyOrders = Object.entries(weeklyRecord)
      .map(([week,count])=>({week,count}))
      .sort((a,b)=> a.week.localeCompare(b.week));

  }

  async setTopItems() {
    const itemCount = this.orders!.reduce((acc,order)=>{
      const items = order.items
      for(const item of items){
        const key = item.item_id;
        acc[key] = (acc[key]||0) + item.quantity;
      }
      return acc;
    },{} as Record<string,number>);

    const itemMap: Record<string, OwnerOrderItem> = {};
    this.orders!.forEach(order => {
      order.items.forEach(item => {
        if (!itemMap[item.item_id]) itemMap[item.item_id] = item;
      });
    });

    this.topItems = Object.entries(itemCount)
      .map(([id,count])=>({item:itemMap[id], count}))
      .sort((a,b)=>b.count - a.count);
  }

  //{{ totalRevenue | currency }}
  async setRevenue(){
    this.totalRevenue = this.topItems!.reduce((sum,iterator)=> sum+iterator.item.price*iterator.count,0)
  }
}
