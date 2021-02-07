import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../../service/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../../models/product';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  product: Product = {
    id: 0,
    title: '',
    description: '',
  };
  id = 0;
  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
        this.id = data.id;
        // tslint:disable-next-line:no-shadowed-variable
      },
      error => {
        console.log(error);
      });

    this.productService.getProduct(this.id).subscribe(data => {
      this.product = data;
      console.log(this.product);
    }, error => {
      console.log(error);
    });
  }

  onSubmit(): void {
    console.log(this.product);
    this.productService.updateProduct(this.id, this.product).subscribe(data => {
        console.log(data);
        this.router.navigateByUrl('/product');
      },
      error => {
        // this.isCreateFailed = true;
        console.log(error);
      });
  }

}
