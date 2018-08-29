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
        // Returns only items that are open or in revision 
          // even though I do that check on the backend
            // is that too much??
        this.orders = orders.map(order => {
          order.items = order.items.filter(item => item.status === 'revise' || item.status === 'open')
          return order
        });
      })
  }

  cookOrder(orderId){
    this.order.cookedOrder(orderId, 'cooked')
      .subscribe(order => {
        this.ngOnInit();
      });
  };

  cookItem(orderId, itemId){
    this.order.cookedItem(orderId, itemId, 'cooked')
      .subscribe(order => {
        this.ngOnInit();
      })
  }

}
