import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../../services/restaurant/restaurant.service';

@Component({
  selector: 'app-app-order',
  templateUrl: './app-order.component.html',
  styleUrls: ['./app-order.component.css']
})
export class AppOrderComponent implements OnInit {
  order;
  tableNumber:string;
  restaurantId:string;

  constructor(
    private route: ActivatedRoute,
    private restaurant: RestaurantService
  ) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      param => this.restaurantId = param.id
    );
  };

  beginOrder(tableNum){
    this.restaurant.createOrder(this.restaurantId, tableNum)
      .subscribe(
        order => this.order = order
      );
  };

}
