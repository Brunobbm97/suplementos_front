import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LocationManagementComponent } from './components/location-management/location-management.component';
import { SharedModule } from '../../shared/shared.module';
import { FinancialCategoryComponent } from './components/financial-category/financial-category.component';


@NgModule({
  declarations: [
    LocationManagementComponent,
    FinancialCategoryComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
