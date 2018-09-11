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
  filteredOrders: Array<String>;
  filteredOrder: String;

  constructor(
    private order: OrderService,
  ) { }

  ngOnInit() {
    this.getOrders();

    setInterval(() => {
      this.getOrders()
    }, 5000);

    
    this.filteredOrders = ['open'];
    this.filteredOrder = 'Viewing Open';
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
    this.order.getRestaurantOrders(this.restaurantId, 'server')
    .subscribe(orders => {
      this.orders = orders.filter(order => {
        order.items = order.items.map(item => {
          const categoriesIndex = this.categories.indexOf(item.category);
          const statusesIndex = this.statuses.indexOf(item.status);
          
          if(categoriesIndex === -1 && item.category !== undefined){
            this.categories.push(item.category);
          // } else if (categoriesIndex > -1 && item.category !== undefined){
          //   this.categories.splice(categoriesIndex, 1);
          };
          
          
          if(statusesIndex === -1 && item.status !== undefined){
            this.statuses.push(item.status);
          // } else if (statusesIndex >-1 && item.status !== undefined){
          //   this.statuses.splice(statusesIndex, 1);
          };
          return item;
        })
        return order.items.length > 0;
      });
    });

    this.filteredCategories = this.categories;
    this.filteredStatus = this.statuses;

  
  };

  itemStatus(orderId, itemId, status){
    this.order.itemStatus(orderId, itemId, status)
      .subscribe(() => {
        this.getOrders();
      })
  }

  orderStatus(orderId, status){
    this.order.orderStatus(orderId, status)
      .subscribe(() => {
        this.getOrders();
      })
  }

  orderFilter(){
    const value = this.filteredOrders[0];
    const length = this.filteredOrders.length;
    switch(true){
      case length>1: this.filteredOrders = ['open']; this.filteredOrder = 'Viewing Open'; break;
      case value === 'open': this.filteredOrders = ['closed']; this.filteredOrder = 'Viewing Closed'; break;
      case value === 'closed': this.filteredOrders = ['open', 'closed']; this.filteredOrder = 'Open & Closed'; break;
    }
    // console.log(this.filteredOrders)
  }


}
