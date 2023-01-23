import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CheckoutService } from '../checkout.service';
import { DeliveryMethod } from 'src/app/shared/models/deliveryMethod';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss']
})
export class CheckoutDeliveryComponent implements OnInit {
  @Input() checkoutForm?:FormGroup;
  deliveryMethods:DeliveryMethod[]=[]
  constructor(private checkOutService:CheckoutService){}
  ngOnInit(): void {
    this.checkOutService.getDeliveryMethods().subscribe
    ({
      next:dm=>this.deliveryMethods = dm 
    }) 
  }
}
//its not hitting ht breackpoints in typescript so need to run it so that is dose
//where to put breackpoint?