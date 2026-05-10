import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'; // <-- IMPORTANTE
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    // Injetamos o Router para podermos fazer o redirecionamento
    constructor(private router: Router) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        const token = localStorage.getItem('access_token');
        let clonedRequest = request; // Guarda a requisição original

        if (token) {
            clonedRequest = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        // Retorna a requisição, mas agora "escutando" se o Java vai xingar a gente
        return next.handle(clonedRequest).pipe(
            catchError((error: HttpErrorResponse) => {

                // Se o Java retornar 401 (Não Autorizado) ou 403 (Proibido)...
                if (error.status === 401 || error.status === 403) {

                    // 1. Destruímos o token adulterado/expirado
                    localStorage.removeItem('access_token');

                    // 2. Expulsamos o usuário imediatamente para o Login
                    this.router.navigate(['/login']);
                }

                // Repassa o erro para frente caso algum componente precise saber
                return throwError(() => error);
            })
        );
    }
}