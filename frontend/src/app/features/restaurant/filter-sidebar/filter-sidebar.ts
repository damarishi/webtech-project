import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantFilter} from '../../../types/RestaurantFilter';

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-sidebar.html',
  styleUrl: './filter-sidebar.css',
})
export class FilterSidebar {
  @Output() filterChange = new EventEmitter<RestaurantFilter>();

  cuisines = ['Italian', 'Asian', 'Austrian', 'Mexican'];
  categories = ['Restaurant', 'Cafe', 'FastFood', 'Bistro'];
  prices = [
    {label: '€', value: 1},
    {label: '€€', value: 2},
    {label: '€€€', value: 3},
  ];
  deliveryTimes = [
    { label: '≤ 30 min', value: 30 },
    { label: '≤ 60 min', value: 60 },
    { label: 'All', value: 999 },
  ];

  filter: RestaurantFilter = {
    cuisines: [],
    categories: [],
    prices: [],
    maxMinutes: 999
  };

  setMaxMinutes(value: number) {
    this.filter.maxMinutes = value;
    this.filterChange.emit({ ...this.filter });
  }

  toggle<T>(list: T[], value: T) {        //T = type declared at run-time
    const index = list.indexOf(value);    //schauen ob filter schon existiert
    index >= 0 ? list.splice(index, 1) : list.push(value);    //entfernen oder hinzufügen
    this.filterChange.emit(this.filter);      //filter zustand senden
  }
}
