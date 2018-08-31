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
      this.orders = orders.map(order => {
        order.items = order.items.map(item => {
          // console.log('item.category:', item.category)

          if(this.categories.indexOf(item.category) === -1 && item.category !== undefined){
            this.categories.push(item.category);
          };
          if(this.statuses.indexOf(item.status) === -1 && item.status !== undefined){
            this.statuses.push(item.status);
          };
          return item
        })
        // console.log(order)
        return order
      });
      // console.log(this.orders);
      // console.log(this.categories);
      this.filteredCategories = this.categories;
      this.filteredStatus = this.statuses;
      console.log(this.statuses)
    })

  }

  filterCategory(inputName){
    const inputs = document.getElementsByName(inputName)

    this.filteredCategories = Array.from(inputs).map(input => {
      if (input['checked']){
        return input['value'];
      }
    })
    
    this.filteredCategories = this.filteredCategories.filter(input => {
      return input != undefined
    })
    
    if(this.filteredCategories.length === 0){
      this.filteredCategories = this.categories
    }
    console.log(this.filteredCategories)
    console.log(this.orders)
  }

  filterStatus(statusName){
    const inputs = document.getElementsByName(statusName);

    this.filteredStatus = Array.from(inputs).map(input => {
      if(input['checked']){
        return input['value'];
      };
    })
    
    this.filteredStatus = this.filteredStatus.filter(status => {
      return status != undefined
    })

    if(this.filteredStatus.length === 0){
      this.filteredStatus = this.statuses;
    }
    
  }

  getOrders(){
    // Same thing that happens in ngOnInit except for the filtered categories and filtered statuses
    this.order.getRestaurantOrders(this.restaurantId, 'server')
    .subscribe(orders => {
      this.orders = orders.map(order => {
        order.items = order.items.map(item => {
          if(this.categories.indexOf(item.category) === -1 && item.category !== undefined){
            this.categories.push(item.category);
          };
          if(this.statuses.indexOf(item.status) === -1 && item.status !== undefined){
            this.statuses.push(item.status);
          };
          return item
        })
        return order
      });
    });
  };

  itemStatus(orderId, itemId, status){
    this.order.itemStatus(orderId, itemId, status)
      .subscribe(() => {
        this.getOrders();
      })
  }


}
