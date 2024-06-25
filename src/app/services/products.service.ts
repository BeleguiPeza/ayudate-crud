import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  headers() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'Bearer ' + JSON.parse(localStorage.getItem('user')).access_token,
    });
  }

  addProduct(product) {
    return this.http.post(`${environment.apiUrl}/product`, product, {
      headers: this.headers(),
    });
  }

  editProduct(id, product) {
    return this.http.put(`${environment.apiUrl}/product/${id}`, product, {
      headers: this.headers(),
    });
  }

  deleteProduct(id: string) {
    return this.http.delete(`${environment.apiUrl}/product/${id}`, {
      headers: this.headers(),
    });
  }

  getProducts() {
    return this.http.get(`${environment.apiUrl}/product`, {
      headers: this.headers(),
    });
  }

  getProduct(id) {
    return this.http.get(`${environment.apiUrl}/product/${id}`, {
      headers: this.headers(),
    });
  }
}
