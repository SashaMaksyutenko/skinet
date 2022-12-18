import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { catchError, Subscription, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product:IProduct;
  loadProd!: Subscription;

  constructor(private shopService:ShopService,private activateRoute:ActivatedRoute){}
  ngOnInit(){ 
    this.loadProduct();
  }
  loadProduct(){
    this.loadProd=this.shopService.getProduct(+this.activateRoute.snapshot.paramMap.get('id')!).subscribe(product=>{this.product=product;})
  }
}
