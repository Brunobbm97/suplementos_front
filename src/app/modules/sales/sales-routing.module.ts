import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PdvComponent } from './components/pdv/pdv.component';
import { SalesHistoryComponent } from './components/sales-history/sales-history.component';

const routes: Routes = [
  {
    path: '', // PRECISA ser vazio aqui para casar com 'dashboard/sales'
    component: PdvComponent
  },
  {
    path: 'historico',
    component: SalesHistoryComponent // O novo endereço da tabela de histórico
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
