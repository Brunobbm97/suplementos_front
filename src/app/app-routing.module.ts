import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard'; // <-- 1. Importe o guarda

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', // Quando o cara entrar no site limpo, mande pro login primeiro!
    pathMatch: 'full'
  },
  {
    path: 'login', // Definimos a rota aqui
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard], // <-- 2. O guarda fica aqui bloqueando a passagem!
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  // Futuramente a rota de login ficaria fora do dashboard
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }