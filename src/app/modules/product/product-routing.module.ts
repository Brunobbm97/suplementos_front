import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { StockManagementComponent } from './components/stock-management/stock-management.component';
import { StockMovementHistoryComponent } from './components/stock-movement-history/stock-movement-history.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent // O componente que criaremos a seguir
  },
  {
    path: 'stock', // <-- NOVA ROTA AQUI
    component: StockManagementComponent // Acessado via: /products/stock
  },
  { path: 'historico-estoque', component: StockMovementHistoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
