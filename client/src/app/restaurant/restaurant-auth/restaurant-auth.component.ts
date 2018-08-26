import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant/restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-auth',
  templateUrl: './restaurant-auth.component.html',
  styleUrls: ['./restaurant-auth.component.css']
})
export class RestaurantAuthComponent implements OnInit {
  restaurants: Array<Object>;
  restaurantPassword: String;
  error: String;

  constructor(
    private restaurant: RestaurantService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.restaurant.getRestaurantNames()
      .subscribe(
        restaurants => {
          this.restaurants = restaurants;
        }
      )
  }

  showModal(element) {
    const modal = document.getElementById(element);
    // console.log(element)
    // console.log(modal)
    const span = modal.children[0].children[0];

    modal.style.display = "block";

    span.addEventListener('click', () => {
      modal.style.display = 'none';
      this.restaurantPassword = null;
      this.error = null;
    })

    window.onclick = (event) => {
      if (event.target == modal) {
        modal.style.display = 'none';
        this.restaurantPassword = null;
        this.error = null;
      }
    }
  }

  restaurantAuthLogin(restaurantId){
    this.restaurant.login(restaurantId, this.restaurantPassword)
      .subscribe(
        restaurant => {
          this.error = null;
          this.router.navigate([`/restaurant/${restaurant.role}/${restaurant.restaurant._id}`])
        },
        err => {
          console.error(err)
          this.error = JSON.parse(err._body).message;
        }
      )
  }

}
