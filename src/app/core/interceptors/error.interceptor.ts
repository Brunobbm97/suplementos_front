import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const messageService = inject(MessageService);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            let errorMessage = 'Ocorreu um erro inesperado. Tente novamente.';

            // 1. Erro de Validação (Aquele @Valid que colocamos no Java)
            if (error.status === 400) {
                if (error.error?.errors) {
                    // Spring costuma retornar uma lista de erros de validação
                    errorMessage = error.error.errors.map((e: any) => e.defaultMessage).join('; ');
                } else {
                    errorMessage = error.error?.message || 'Dados inválidos. Verifique os campos.';
                }
            }

            // 2. Erro de Servidor Fora do Ar
            else if (error.status === 0) {
                errorMessage = 'Não foi possível conectar ao servidor. Verifique sua internet.';
            }

            // 3. Erro de Permissão (403) ou Não Encontrado (404)
            else if (error.status === 403) {
                errorMessage = 'Você não tem permissão para realizar esta ação.';
            }

            // Mostra o Toast (Balão) de erro na tela
            messageService.add({
                severity: 'error',
                summary: 'Erro ' + error.status,
                detail: errorMessage,
                life: 5000 // Fica 5 segundos na tela
            });

            return throwError(() => error);
        })
    );
};