import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardShellComponent } from './components/dashboard-shell/dashboard-shell.component';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardShellComponent,
    children: [
      { path: 'home', component: DashboardHomeComponent },
      {
        path: 'products',
        loadChildren: () => import('../product/product.module').then(m => m.ProductModule)
      },
      {
        path: 'sales',
        loadChildren: () => import('../sales/sales.module').then(m => m.SalesModule)
      },
      {
        path: 'purchases',
        loadChildren: () => import('../purchases/purchases.module').then(m => m.PurchasesModule)
      },
      {
        path: 'financial',
        loadChildren: () => import('../financial/financial.module').then(m => m.FinancialModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule)
      },
      // Rota padrão interna do Dashboard (ex: uns cards com resumos)
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }