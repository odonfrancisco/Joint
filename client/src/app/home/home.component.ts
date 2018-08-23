import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { RestaurantService } from '../services/restaurant/restaurant.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any;
  currentRestaurant:String;
  restaurants: Array<Object>;

  constructor(
    private session: SessionService,
    private restaurant: RestaurantService
  ) { }

  ngOnInit(){
    this.session.isLoggedIn()
      .subscribe(
        user => {
          this.user = user;
        },
        err => {
          console.error(err);
        }
      )

      // console.log(this.restaurant)
    // if(this.user){
      this.restaurant.getRestaurantNames()
        .subscribe(
          restaurants => {
            this.restaurants = restaurants;
            console.log(restaurants)
          }
        )
    // }
  }

  pickRestaurant(){
    
  }

}
