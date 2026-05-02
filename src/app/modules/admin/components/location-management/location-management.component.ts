import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ProductService } from '../../../product/service/product.service';
import { LocationService } from '../../../product/service/location.service';

@Component({
  selector: 'app-location-management',
  standalone: false,
  templateUrl: './location-management.component.html',
  providers: [MessageService, ConfirmationService]
})
export class LocationManagementComponent implements OnInit {
  locations: any[] = [];

  displayForm: boolean = false;
  locationForm: FormGroup;
  isEditing: boolean = false;
  currentLocationId: number | null = null;

  locationTypes = [
    { label: 'Loja Física', value: 'LOJA' },
    { label: 'Depósito / Armazém', value: 'ESTOQUE' }
  ];

  constructor(
    private productService: ProductService,
    private locationService: LocationService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    // Todos os campos mapeados exatamente como no seu DTO do Spring Boot!
    this.locationForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      zipCode: [''], // CEP
      street: ['', Validators.required], // Rua
      number: ['', Validators.required], // Número
      neighborhood: ['', Validators.required], // Bairro
      city: [''], // Cidade
      state: [''], // Estado (UF)
      phone: ['', Validators.required], // Telefone
      email: ['', Validators.email] // Validador de email embutido do Angular
    });
  }

  ngOnInit(): void {
    this.loadLocations();
  }

  loadLocations() {
    this.locationService.getLocations().subscribe({
      next: (data) => this.locations = data,
      error: (err) => this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar locais.' })
    });
  }

  openNew() {
    this.isEditing = false;
    this.currentLocationId = null;
    this.locationForm.reset();
    this.displayForm = true; // <-- Esta é a linha que faz o modal aparecer!
  }

  editLocation(location: any) {
    this.isEditing = true;
    this.currentLocationId = location.id;
    // Preenche o formulário com TODOS os dados que vieram do banco
    this.locationForm.patchValue({
      name: location.name,
      type: location.type,
      zipCode: location.zipCode,
      street: location.street,
      number: location.number,
      neighborhood: location.neighborhood,
      city: location.city,
      state: location.state,
      phone: location.phone,
      email: location.email
    });
    this.displayForm = true;
  }

  saveLocation() {
    if (this.locationForm.invalid) {
      // Força a exibição dos erros se o usuário tentar salvar com campos em branco
      this.locationForm.markAllAsTouched();
      return;
    }

    const requestData = this.locationForm.value;

    if (this.isEditing && this.currentLocationId) {
      this.locationService.updateLocation(this.currentLocationId, requestData).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Local atualizado!' });
          this.displayForm = false;
          this.loadLocations();
        },
        error: (err) => this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar.' })
      });
    } else {
      this.locationService.createLocation(requestData).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Local criado com sucesso!' });
          this.displayForm = false;
          this.loadLocations();
        },
        error: (err) => this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar local.' })
      });
    }
  }

  deleteLocation(location: any) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir o local <b>${location.name}</b>?`,
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim, Excluir',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.locationService.deleteLocation(location.id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Local excluído!' });
            this.loadLocations();
          },
          error: (err) => {
            const msg = err.error?.error || 'Erro ao excluir. Verifique se há estoque vinculado.';
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: msg });
          }
        });
      }
    });
  }
}