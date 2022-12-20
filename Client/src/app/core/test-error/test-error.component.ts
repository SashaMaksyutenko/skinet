import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit{

  errorTest!: Subscription;
  baseUrl='http://localhost:5183/api/';
  validationErrors:any;
  constructor(private http:HttpClient){}
  ngOnInit() {
  }
  get404Error(){
    this.errorTest=this.http.get(this.baseUrl+'products/42').subscribe(response=>{console.log(response);
    })
  }
  get500Error(){
    this.errorTest=this.http.get(this.baseUrl+'buggy/servererror').subscribe(response=>{console.log(response);
    })
  }
  get400Error(){
    this.errorTest=this.http.get(this.baseUrl+'buggy/badrequest').subscribe(response=>{console.log(response);
    })
  }
  get400ValidationError(){
    this.errorTest  =this.http.get<any>(this.baseUrl+'products/fortytwo').pipe(tap((response) =>{
      console.log(response);
    }),catchError((error) => {
  
       this.validationErrors = error.errors; 
       throw null;
    })).subscribe();
  }
}
