import { NgModule } from '@angular/core';

import { SalesRoutingModule } from './sales-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { PdvComponent } from './components/pdv/pdv.component';
import { SalesHistoryComponent } from './components/sales-history/sales-history.component';


@NgModule({
  declarations: [
    PdvComponent,
    SalesHistoryComponent
  ],
  imports: [
    SharedModule,
    SalesRoutingModule
  ]
})
export class SalesModule { }
