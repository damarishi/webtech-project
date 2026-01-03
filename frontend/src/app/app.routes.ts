import { Routes } from '@angular/router';

//import Site manager Components here
import { SiteManager } from './pages/site-manager/site-manager';
import { DataView } from './pages/site-manager/data-view/data-view';


export const routes: Routes = [
    {
        path: 'site-manager',
        component: SiteManager
    },
    {
        path: 'site-manager/data-view/:category',
        component: DataView
    }
];
