import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from './models/product';
import { IPagination } from './models/pagination';
import { catchError, EMPTY, map, Observable, tap, throwError } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Skinet';
  products: IProduct[] = new Array< IProduct>();
 
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
   let data  = this.http.get<IPagination>('http://localhost:5183/api/products?pageSize=50')
    .pipe(catchError((err) => {console.log(err)
    return throwError(() => err)  }  )).subscribe(res=> this.products = res.data);
    }
  
}