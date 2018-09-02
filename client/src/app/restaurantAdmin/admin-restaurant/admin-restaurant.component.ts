import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-admin-restaurant',
  templateUrl: './admin-restaurant.component.html',
  styleUrls: ['./admin-restaurant.component.css']
})
export class AdminRestaurantComponent implements OnInit {
  @Input() restaurantId;
  
  kitchen: boolean;
  server: boolean;
  customer: boolean;
  restaurant: boolean;

  constructor() { }

  ngOnInit() {
  }

  toggleView(role){
    this.kitchen = false;
    this.server = false;
    this.customer = false;
    this.restaurant = false;

    this[role] = true;

  }

}
