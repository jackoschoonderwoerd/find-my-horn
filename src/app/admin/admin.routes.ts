import { Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { BrandsComponent } from './brands/brands.component';

export const routes: Routes = [
    {
        path: 'admin', component: AdminComponent,
        children: [
            {

                path: 'brands', component: BrandsComponent
            }
        ]
    },


];
