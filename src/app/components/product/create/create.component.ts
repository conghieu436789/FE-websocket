import { Component, OnInit } from '@angular/core';
import {Product} from '../../../models/product';
import {ProductService} from '../../../service/product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  form: any = {};
  product!: Product;
  isCreateFailed = false;
  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  saveProduct(): void {
    // @ts-ignore
    console.log(this.form);
    this.product = new Product(this.form.title, this.form.description)
    this.productService.createProduct(this.product).subscribe(data => {
        console.log(data);
        this.router.navigateByUrl('/product/list');
        this.isCreateFailed = false;
      },
      error => {
        this.isCreateFailed = true;
        console.log(error);
      });
  }
}
