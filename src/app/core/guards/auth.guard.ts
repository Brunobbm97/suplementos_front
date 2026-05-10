import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../modules/auth/service/auth-service.service';

// Diferente dos componentes, o Guard funcional é apenas uma constante que retorna verdadeiro ou falso
export const authGuard: CanActivateFn = (route, state) => {

  // O 'inject' é a forma moderna do Angular puxar dependências sem precisar de um construtor de classe
  const authService = inject(AuthService);
  const router = inject(Router);

  // 1. O segurança verifica o crachá
  if (authService.isLoggedIn()) {
    return true; // Catraca liberada! Pode renderizar a tela.
  }

  // 2. Sem crachá? Bloqueia a catraca (false) e chuta de volta pro Login
  router.navigate(['/login']);
  return false;
};