import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardShellComponent } from './components/dashboard-shell/dashboard-shell.component';

import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { SharedModule } from '../../shared/shared.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

@NgModule({
  declarations: [DashboardShellComponent, DashboardHomeComponent],
  imports: [
    SharedModule,
    DashboardRoutingModule,
    MenuModule
  ],
  providers: [
    MessageService,
    ConfirmationService
  ]
})
export class DashboardModule { }
