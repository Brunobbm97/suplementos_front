import { NgModule } from '@angular/core';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './components/product-list/product-list.component';

// PrimeNG
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { SharedModule } from '../../shared/shared.module';
import { StockManagementComponent } from './components/stock-management/stock-management.component';
import { StockMovementHistoryComponent } from './components/stock-movement-history/stock-movement-history.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductFormComponent,
    StockManagementComponent,
    StockMovementHistoryComponent
  ],
  imports: [
    SharedModule,
    ProductRoutingModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    TagModule
  ]
})
export class ProductModule { }
