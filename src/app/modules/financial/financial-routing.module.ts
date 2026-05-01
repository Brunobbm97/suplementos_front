import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancialAgendaComponent } from './components/financial-agenda/financial-agenda.component';
import { FinancialHomeComponent } from './components/financial-home/financial-home.component';

const routes: Routes = [
  {
    path: '',
    component: FinancialHomeComponent // Define a Agenda como a página principal do módulo
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialRoutingModule { }
