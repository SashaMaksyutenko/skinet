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
  @ViewChild('search',{static:true})searchTerm:ElementRef;
  subProd!: Subscription;
  subBrand!: Subscription;
  subType!: Subscription;
  baseUrl = 'http://localhost:5183/api/';
  products: IProduct[];
  brands: IBrand[];
  types:IType[];
  shopParams=new ShopParams();
  totalCount:number;
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
  /*
 np 
 whats your docker and others?
 i fixed the hyper -v issue and am able to run linux on windows now 
 i had an issue with 1800 trogen virus and a were flaged but they were false flags so fixed that 

 now im just trying to back up pc and fix a few other bits
 congrats lol
 and you want to run sql server on macos to?
 not sure yet i only wanted the mac to use for visual studio to connect to to run iso iphone
 i never really intended on using it to develop on but though i might was well see if i could set it up
 i domt know if docker is woorking on there properly though and i dont want to waist any more time on vm as already waisted too much time
 on it  i just had email from apple -
    "In order to request this App Store Connect API, you must have access to the App Store Connect
 website which is a feature for Apple Developer Program members. The Apple Developer Program membership for individuals and companies is $99 a year!"

 so making game for apple might not be possible as im not paying that much just to publish a game when its free for android
 i cant beleive apple charge you to publish games ! dosnt exsactly encourage people to develop on apple
 any way i am going to fix my pc , back it up then fous on the video tuoral your doing now as now i know i wont be making game for iphone
 coz im not paying 99 just to publish it lol
 lol very interesting info but its all apple. lol its very progresive company and there are no cheap products which they made and they have very
 hight reputation so they think that they can get such money from the developers like you lol because they deserved this price for their work i think ...lol
 lol most evelopers like me are very tight with money lol
 any way hope that helps you ye#s thanks oh by the way that game loaded to windows from mac?
 i not tryed loading the game from macc to windows yer as im on windoss so kinda no point 
 its hard enough to load to mac from windows lol
 it still dont connected?
 no it connect it just freezes and i had it working once where i waas able to load up latest iphone on windows 
 using the mac vm and was going to test my game but wanted to do somthing else first and now ever since i t just get stuck loading and eats up all my memory 
 i may try reinstalling visual studio 
 its a reaaly hard work . and will you try to load that game from windows on macos vm later?
 later on once i fix windows and you still want to look on it working ?
 i wont to see if i can make it work i know i can i have done before so just need to fix about 00 diffrent issues first, now that i fixed hyper-v thats a1 down out of 99
 so if you make it just let me know i want to see the result of your job o
 kwill do 
 any way will let u get on and will catch up later on im sure
 thanks i believe that we 'll see it 
 hopfully one day
 take it eaisy and see u soon its really interesting to take a look on it 
 when its complete hopfully
 well good luck with ur stuff
 thanks you to and what can you say about macos you still dont like it well? no not when it trys to make me pay and is too locked down
 ok thank and good luck 
 thanks u too
 cya soon :)cya 

  */

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
