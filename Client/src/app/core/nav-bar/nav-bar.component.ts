import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountRoutingModule } from 'src/app/account/account-routing.module';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { Basket } from 'src/app/shared/models/basket';
import { BasketItem } from 'src/app/shared/models/basket';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent  {
  constructor(public basketService:BasketService,public accountService:AccountService) {}
  getCount(items: BasketItem[]) {
    return items.reduce((sum, item) => sum + item.quantity, 0);
}
}
