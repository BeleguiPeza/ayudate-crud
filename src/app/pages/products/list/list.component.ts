import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HeaderComponent } from '../../header/header.component';
import { ProductService } from '../../../services/products.service';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

export interface ProductData {
  id: string;
  name: string;
  price: number;
  qty: number;
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    HeaderComponent,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  admin = JSON.parse(localStorage.getItem('user')).type;
  displayedColumns: string[] = this.admin
    ? ['id', 'name', 'price', 'qty']
    : ['id', 'name', 'price', 'qty', 'edit', 'delete'];
  dataSource: MatTableDataSource<ProductData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productsService: ProductService, private router: Router) {
    console.log(this.admin);
    this.productsService.getProducts().subscribe((resp: any) => {
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addProduct() {
    this.router.navigate(['/detais', 0]);
  }

  editProduct(id) {
    this.router.navigate(['/detais', id]);
  }

  deleteProduct(id) {
    this.productsService.deleteProduct(id).subscribe((resp: any) => {
      this.productsService.getProducts().subscribe((resp: any) => {
        this.dataSource = new MatTableDataSource(resp);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }
}
