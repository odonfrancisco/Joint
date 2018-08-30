import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from '../../services/order/order.service';

@Component({
  selector: 'app-server-all-orders',
  templateUrl: './server-all-orders.component.html',
  styleUrls: ['./server-all-orders.component.css']
})
export class ServerAllOrdersComponent implements OnInit {
  @Input() restaurantId;

  orders: Array<any>;
  categories: Array<String> = [];
  filteredCategories: Array<String> = [];
  statuses: Array<String> = [];
  filteredStatus: Array<String> = [];

  constructor(
    private order: OrderService,
  ) { }

  ngOnInit() {
    this.order.getRestaurantOrders(this.restaurantId, 'server')
    .subscribe(orders => {
      // Returns only items that are open or in revision 
        // even though I do that check on the backend
          // is that too much??
      // It also adds the categories for the filter so I guess it's 
        // somewhat useful now

      this.orders = orders.map(order => {
        order.items = order.items.map(item => {
          console.log('item.category:', item.category)

          if(this.categories.indexOf(item.category) === -1 && item.category !== undefined){
            this.categories.push(item.category);
          };
          if(this.statuses.indexOf(item.status) === -1 && item.status !== undefined){
            this.statuses.push(item.status);
          };
          return item
        })
        console.log(order)
        return order
      });
      console.log(this.orders);
      console.log(this.categories);
      this.filteredCategories = this.categories;
      this.filteredStatus = this.statuses;
    })

  }

}
