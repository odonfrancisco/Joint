import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant/restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-new',
  templateUrl: './restaurant-new.component.html',
  styleUrls: ['./restaurant-new.component.css']
})
export class RestaurantNewComponent implements OnInit {
  newRestaurant: Object;
  error;

  hideModal;

  constructor(
    private restaurantServ: RestaurantService,
    private router: Router
  ) { }

  ngOnInit() {
    this.newRestaurant = {
      name: '',
      cuisine: '',
      description: '',
      picture: '',
      accessKeys: {
        admin: {
          key: 'admin',
          users: []
        },
        kitchen: {
          key: 'kitchen',
          users: []
        },
        server: {
          key: 'server',
          users: []
        }
      }
    }
    }

  showModal(element) {
    const modal = document.getElementById(element);
    // console.log(element)
    // console.log(modal)
    const span = modal.children[0].children[0];

    modal.style.display = "block";

    span.addEventListener('click', () => {
      modal.style.display = 'none';
    })

    this.hideModal = () => {
      modal.style.display = 'none'
    }

    window.onclick = (event) => {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    }
  }

  createNewRestaurant(){
    console.log(this.newRestaurant)
    this.restaurantServ.createNewRestaurant(this.newRestaurant)
      .subscribe(
        newRestaurant => {
          this.hideModal()
          this.router.navigate[`/restaurant/admin/${newRestaurant._id}`]
        },
        error => {
          this.error = error.message;
          console.log(error)
        }
      )
  }

}
