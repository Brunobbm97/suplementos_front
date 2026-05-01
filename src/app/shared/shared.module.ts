import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// PrimeNG - Agrupamos os principais aqui
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { StatusBadgeComponent } from './components/status-badge/status-badge.component';
import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown'; // <-- ADICIONE AQUI
import { CalendarModule } from 'primeng/calendar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ChartModule } from 'primeng/chart';
import { BadgeModule } from 'primeng/badge';
import { SelectButtonModule } from 'primeng/selectbutton';

@NgModule({
  declarations: [
    StatusBadgeComponent
  ], // Aqui entrarão seus Pipes ou Componentes customizados no futuro
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    TagModule,
    ToolbarModule,
    TooltipModule,
    CardModule,
    InputNumberModule,
    AvatarModule,
    DialogModule,
    ToastModule,
    MessageModule,
    ConfirmDialogModule,
    DropdownModule,
    CalendarModule,
    ChartModule,
    BadgeModule,
    SelectButtonModule
  ],
  exports: [
    // Exportamos tudo para que os outros módulos tenham acesso
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    TagModule,
    ToolbarModule,
    TooltipModule,
    CardModule,
    InputNumberModule,
    StatusBadgeComponent,
    AvatarModule,
    DialogModule,
    ToastModule,
    MessageModule,
    ConfirmDialogModule,
    DropdownModule,
    CalendarModule,
    ChartModule,
    BadgeModule,
    SelectButtonModule
  ],
  providers: [
    ConfirmationService
  ]
})
export class SharedModule { }