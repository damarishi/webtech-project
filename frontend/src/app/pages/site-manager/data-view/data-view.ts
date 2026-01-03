import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-data-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-view.html',
  styleUrl: './data-view.css',
})
export class DataView {
  category: string | null = "";   //category from route parameter

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    //TODO Fabian: Verstehe das noch nicht ganz, besser machen/verstehen
    //sets category var, able to access in html via {{category}}
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category');
    });
  }
}
