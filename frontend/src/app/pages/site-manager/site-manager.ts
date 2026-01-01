import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-site-manager',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './site-manager.html',
  styleUrl: './site-manager.css'
})
export class SiteManager {

}
