import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RestaurantFilter} from '../../../types/restaurant-filter';

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

  sortOptions = [
    { label: 'Rating ⇣', value: 'rating-desc' },
    { label: 'Rating ⇡', value: 'rating-asc' }
  ];

  filter: RestaurantFilter = {
    cuisines: [],
    prices: [],
    maxMinutes: 999,
    sortBy: undefined,
    sortDirection: undefined
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

  setSort(value: string) {
    if (value === 'rating-desc') {
      this.filter.sortBy = 'rating';
      this.filter.sortDirection = 'desc';
    } else if (value === 'rating-asc') {
      this.filter.sortBy = 'rating';
      this.filter.sortDirection = 'asc';
    } else {
      this.filter.sortBy = undefined;
      this.filter.sortDirection = undefined;
    }

    this.filterChange.emit({ ...this.filter });
  }
}
