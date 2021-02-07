import { Component, OnInit } from '@angular/core';
import {Product} from '../../../models/product';
import {ProductService} from '../../../service/product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  products : any[] = [];
  searchList !: Product[];
  public search !: string;
  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.searchList = [];
    this.productService.getAllProducts().subscribe(data => {
        this.products = data;
        this.searchList = this.products;
      },
      error => {
        console.log(error);
      });
  }
  onSearch(): void {
    console.log(this.products);
    this.searchList = [];
    if (this.search) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].title.toLowerCase().includes(this.search)) {
          this.searchList.push(this.products[i]);
        }
      }
    } else if (this.search == '' || !this.search) {
      this.searchList = this.products;
    }
  }

  removeProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(data => {
        for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].id == id) {
            this.products.splice(i, 1);
            break;
          }
        }
      },
      error => {
        console.log(error);
      });
  }

}
