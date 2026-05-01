import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../interface/product.interface';
import { ProductService } from '../../service/product.service';
import { LocationService } from '../../service/location.service';

@Component({
  selector: 'app-product-form',
  standalone: false,
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent {
  @Input() product: Product | null = null;
  @Input() visible: boolean = false;
  @Output() onSave = new EventEmitter<Product>();
  @Output() onClose = new EventEmitter<void>();

  productForm: FormGroup;
  locations: any[] = [];
  selectedLocation: number = 0;

  constructor(
    private productService: ProductService,
    private locationService: LocationService,
    private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      sku: [''],
      brand: ['', Validators.required],
      flavor: [''],
      salePrice: [0, [Validators.required, Validators.min(0.01)]],
      description: ['']
    });
  }

  ngOnChanges() {
    if (this.product) {
      this.productForm.patchValue(this.product);
    } else {
      this.productForm.reset({ salePrice: 0 });
    }
  }

  save() {
    if (this.productForm.valid) {
      this.onSave.emit(this.productForm.value);
    }
  }

  loadLocations() {
    this.locationService.getLocations().subscribe({
      next: (data) => {
        this.locations = data;
        // Seleciona automaticamente a primeira loja da lista (ex: Depósito Central)
        if (this.locations.length > 0) {
          this.selectedLocation = this.locations[0].id;
        }
      },
      error: (err) => console.error('Erro ao carregar lojas', err)
    });
  }
}