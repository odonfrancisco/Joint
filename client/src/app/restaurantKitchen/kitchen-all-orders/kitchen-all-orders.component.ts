import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from '../../services/order/order.service';

@Component({
  selector: 'app-kitchen-all-orders',
  templateUrl: './kitchen-all-orders.component.html',
  styleUrls: ['./kitchen-all-orders.component.css']
})
export class KitchenAllOrdersComponent implements OnInit {
  @Input() restaurantId;
  orders: any;

  constructor(
    private order: OrderService,
  ) { }

  ngOnInit() {
    this.order.getRestaurantOrders(this.restaurantId)
      .subscribe(orders => {
        this.orders = orders
      })
  }

}
