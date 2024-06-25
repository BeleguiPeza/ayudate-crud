import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/products.service';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Product {
  id?: number;
  name?: string;
  price?: number;
  qty?: number;
}

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [HeaderComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent {
  params = 0;
  form!: FormGroup;
  product: Product = {
    name: '',
    price: 0,
    qty: 0,
  };
  error = '';

  constructor(
    private router: Router,
    private actveRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private productsService: ProductService
  ) {
    this.params = parseInt(this.actveRoute.snapshot.paramMap.get('id'));
    if (this.params) {
      this.productsService.getProduct(this.params).subscribe((resp: any) => {
        this.form.controls['name'].setValue(resp.name);
        this.form.controls['price'].setValue(resp.price);
        this.form.controls['qty'].setValue(resp.qty);
      });
    }
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      qty: ['', [Validators.required]],
    });
  }

  submit() {
    if (this.params) {
      this.product.name = this.form.get('name')?.value;
      this.product.price = this.form.get('price')?.value;
      this.product.qty = this.form.get('qty')?.value;
      this.productsService.editProduct(this.params, this.product).subscribe(
        (res) => {
          this.router.navigate(['/products']);
        },
        (err) => {
          this.error = err.error.message;
        }
      );
    } else {
      this.product.name = this.form.get('name')?.value;
      this.product.price = this.form.get('price')?.value;
      this.product.qty = this.form.get('qty')?.value;
      this.productsService.addProduct(this.product).subscribe(
        (res) => {
          this.router.navigate(['/products']);
        },
        (err) => {
          this.error = err.error.message;
        }
      );
    }
  }
}
