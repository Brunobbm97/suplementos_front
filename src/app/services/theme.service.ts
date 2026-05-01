import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private isDarkMode = false;

    constructor() {
        // Ao iniciar, verifica se o usuário já preferia o tema escuro
        const savedTheme = localStorage.getItem('app-theme');
        if (savedTheme === 'dark') {
            this.isDarkMode = true;
            document.documentElement.classList.add('my-app-dark'); // ou 'p-dark'
        }
    }

    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;

        // O PrimeNG 18+ escuta a injeção dessa classe no elemento root (HTML)
        if (this.isDarkMode) {
            document.documentElement.classList.add('my-app-dark');
        } else {
            document.documentElement.classList.remove('my-app-dark');
        }

        // Salva a preferência
        localStorage.setItem('app-theme', this.isDarkMode ? 'dark' : 'light');
    }

    isDark(): boolean {
        return this.isDarkMode;
    }
}