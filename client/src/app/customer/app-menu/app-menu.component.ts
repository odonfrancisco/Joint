import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../../services/restaurant/restaurant.service';

@Component({
  selector: 'app-app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.css']
})
export class AppMenuComponent implements OnInit {
  @Input() order: any;
  @Input() restaurantId: any;
  menus: Array<Object>;


  constructor(
    private route: ActivatedRoute,
    private restaurant: RestaurantService,
  ) { }

  ngOnInit() {
    this.restaurant.getMenus(this.restaurantId)
      .subscribe(
        menus => {
          this.menus = menus
        },
        err => {
          console.error(err)
        }
      )
  
    // Get the modal
    const modal = document.getElementById('myModal');

    // Get the button that opens the modal
    const btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal 
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal

    modal.children[0].children[0].onclick = function(){
      modal.style.display = 'none';
    }

    // span.onclick = function() {
    //     modal.style.display = "none";
    // }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

  }

  showModal(element) {
    const modal = document.getElementById(element);
    console.log(element)
    console.log(modal)
    const span = modal.children[0].children[0];

    modal.style.display = "block";

    span.onclick = () => {
      modal.style.display = 'none';
    }

    window.onclick = (event) {
      if (event.target == modal) {
        modal.style.display = 'none'
      }
    }

  }


}
