import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'; 
import { FetchDataService } from '../../../services/fetch-data-service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-data-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-view.html',
  styleUrl: './data-view.css',
})
export class DataView {
  category: string | null = "";   //category from route parameter
  items: any[] = []; //data items to display
  isLoading: boolean = false; //loading state
  Object = Object; //to use Object.keys in template

  constructor(
    private route: ActivatedRoute,
    private dataService: FetchDataService,
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
      this.items = await this.dataService.fetchData(category);
      if(this.items === null) throw new Error("No data received");
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges(); //forces render update
    }
  }
}


