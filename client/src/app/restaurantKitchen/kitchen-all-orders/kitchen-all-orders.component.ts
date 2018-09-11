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
  categories: Array<string> = [];
  category: String;
  filteredCategories: Array<string> = [];

  constructor(
    private order: OrderService,
  ) { }

  ngOnInit() {
    this.getOrders();

    setInterval(() => {
      this.getOrders()
    }, 5000)
  }

  getOrders(){
    this.order.getRestaurantOrders(this.restaurantId, 'kitchen')
    .subscribe(orders => {
      // Returns only items that are open or in revision 
        // even though I do that check on the backend
          // is that too much??
        // Matter of fact, it actually is necessary because on the backend 
          // I return orders who have an item with open or revise, which in turn
          // returns the whole order and not just the items which match my query.
            // Makes sense
      // It also adds the categories for the filter so I guess it's 
        // somewhat useful now
      this.orders = orders.map(order => {
        order.items = order.items.filter(item => {
          // console.log('item: ', item)
          // console.log('item.category:', item.category)

          if(this.categories.indexOf(item.category) === -1 && item.category !== undefined){
            this.categories.push(item.category)
          }
          return item.status === 'revise' || item.status === 'open'
        })
        return order
      });
      // console.log(this.orders);
      // console.log(this.categories);
      this.filteredCategories = this.categories;
    })
  }

  cookOrder(orderId){
    this.order.orderStatus(orderId, 'cooked')
      .subscribe(order => {
        this.ngOnInit();
      });
  };

  cookItem(orderId, itemId){
    this.order.itemStatus(orderId, itemId, 'cooked')
      .subscribe(order => {
        this.ngOnInit();
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
  }

}
