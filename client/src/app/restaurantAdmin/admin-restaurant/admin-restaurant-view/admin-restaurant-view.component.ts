import { Component, OnInit, Input } from '@angular/core';
import { RestaurantService } from '../../../services/restaurant/restaurant.service';

@Component({
  selector: 'app-admin-restaurant-view',
  templateUrl: './admin-restaurant-view.component.html',
  styleUrls: ['./admin-restaurant-view.component.css']
})
export class AdminRestaurantViewComponent implements OnInit {
  @Input() restaurantId;

  restaurant: any;
  menus: boolean;
  
  constructor(
    private restaurantServ: RestaurantService,
  ) { }

  ngOnInit() {
    this.getMenus();
  }

  toggleMenu(){
    if(!this.menus){
      this.menus = true;
    } else {
      this.menus = false;
    }
  }

  getMenus(){
    this.restaurantServ.getRestaurant(this.restaurantId)
      .subscribe(restaurant => {
        this.restaurant = restaurant;
      })
  }

}
