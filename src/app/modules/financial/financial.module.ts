import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancialRoutingModule } from './financial-routing.module';
import { FinancialAgendaComponent } from './components/financial-agenda/financial-agenda.component';
import { SharedModule } from '../../shared/shared.module';
import { FinancialHomeComponent } from './components/financial-home/financial-home.component';
import { FinancialChartComponent } from './components/financial-chart/financial-chart.component';
import { FinancialQuickEntryComponent } from './components/financial-quick-entry/financial-quick-entry.component';
import { FinancialPendingTableComponent } from './components/financial-pending-table/financial-pending-table.component';
import { FinancialBalanceWidgetComponent } from './components/financial-balance-widget/financial-balance-widget.component';
import { FinancialSummaryCardsComponent } from './components/financial-summary-cards/financial-summary-cards.component';


@NgModule({
  declarations: [
    FinancialAgendaComponent,
    FinancialHomeComponent,
    FinancialChartComponent,
    FinancialQuickEntryComponent,
    FinancialPendingTableComponent,
    FinancialBalanceWidgetComponent,
    FinancialSummaryCardsComponent
  ],
  imports: [
    SharedModule,
    FinancialRoutingModule
  ]
})
export class FinancialModule { }
