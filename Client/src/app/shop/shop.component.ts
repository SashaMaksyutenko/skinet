import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopService } from './shop.service';
import { HttpClient } from '@angular/common/http';
import { IPagination } from '../shared/models/pagination';
import { catchError, Subscription, throwError } from 'rxjs';
import {IBrand} from '../shared/models/brand';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  @ViewChild('search',{static:true})searchTerm!:ElementRef;
  subProd!: Subscription;
  subBrand!: Subscription;
  subType!: Subscription;
  baseUrl = 'http://localhost:5183/api/';
  products: IProduct[] = [];
  brands: IBrand[] = [];
  types:IType[]= [];
  shopParams=new ShopParams();
  totalCount:number = 0;
  sortOptions=[
    {name:'Alphabetical',value:'name'},
    {name:'Price: Low to High',value:'priceAsc'},
    {name:'Price: High to Low',value:'priceDesc'}
  ];

  constructor(private shopService: ShopService, private http: HttpClient) {}
  ngOnInit() { 
    this.getProducts();
    this.getTypes();
    this.getBrands();
  }
  ngOnDestroy(): void {
    if (this.subProd) {
      this.subProd.unsubscribe();
    }
       if (this.subBrand) {
      this.subBrand.unsubscribe();
    }
    if (this.subType) {
      this.subType.unsubscribe();
    }   
  }

  getProducts(){
    this.subProd = this.shopService
      .getProducts(this.shopParams)
      .subscribe((response) => {
          this.products = response?.data  ||  this.products
          this.shopParams.pageNumber = response?.pageIndex || 0
          this.shopParams.pageSize = response?.pageSize || 0
          this.totalCount = response?.count || 0
      });
  }
getBrands(){
  this.subBrand=this.shopService.getBrands().subscribe(response=>{
    this.brands=[{id:0,name:'All'},...response];
  });
} 
  getTypes(){
      this.subType=this.shopService.getTypes().subscribe(res=>{
        this.types=[{id:0,name:'All'},...res];
      });
  }
  onBrandSelected(brandId:number){
    this.shopParams.brandId=brandId;
    this.getProducts();
    this.shopParams.pageNumber=1;
  }
  onTypeSelected(typeId:number){
    this.shopParams.typeId=typeId;
    this.getProducts();
  }
  onSortSelected(sort:string){
    this.shopParams.sort=sort;
    this.getProducts();
  }
  onPageChanged(event:any){
    if(this.shopParams.pageNumber!==event)
    {
      this.shopParams.pageNumber=event;
    this.getProducts();
    }   
  }
  onSearch(){
    this.shopParams.search=this.searchTerm.nativeElement.value;
    this.getProducts();
    this.shopParams.pageNumber=1;
  }
  onReset(){
    this.searchTerm.nativeElement.value='';
    this.shopParams= new ShopParams;
    this.getProducts();
  }
}
