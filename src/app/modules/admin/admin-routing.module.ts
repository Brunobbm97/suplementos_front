import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationManagementComponent } from './components/location-management/location-management.component';
import { FinancialCategoryComponent } from './components/financial-category/financial-category.component';

const routes: Routes = [
  { path: 'locais', component: LocationManagementComponent },
  { path: 'categorias-financeiras', component: FinancialCategoryComponent }
  // No futuro, colocaremos a rota de categorias financeiras aqui também!
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }