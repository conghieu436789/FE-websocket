import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../models/product';
import {TokenStorageService} from '../token/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/product'
  constructor(
    private http: HttpClient,
    private token: TokenStorageService
  ) { }

  getAllProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`)
  }
  getProduct(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`)
  }
  createProduct(product: Product): Observable<any> {
    // const token = this.token.getToken();
    // let headers = new HttpHeaders();
    // headers = headers.set('Authorization', `Bearer ${token}`);
    // return this.http.post(`${this.baseUrl}/create`, product, {headers});
    return this.http.post(`${this.baseUrl}/create`, product);
  }
  updateProduct(id: number, product: Product): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, product);
  }
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text'});
  }

}
