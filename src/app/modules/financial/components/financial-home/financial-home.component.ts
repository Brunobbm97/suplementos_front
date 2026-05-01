import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-financial-home',
  standalone: false,
  templateUrl: './financial-home.component.html',
  styleUrl: './financial-home.component.scss'
})
export class FinancialHomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Aqui no futuro chamaremos o serviço para carregar os dados iniciais
  }

}