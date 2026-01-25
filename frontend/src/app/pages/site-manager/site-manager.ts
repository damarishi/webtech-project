import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Navbar } from '../../shared/ui/navbar/navbar';

@Component({
  selector: 'app-site-manager',
  standalone: true,
  imports: [CommonModule, RouterModule, Navbar],
  templateUrl: './site-manager.html',
  styleUrl: './site-manager.css'
})
export class SiteManager {

}
