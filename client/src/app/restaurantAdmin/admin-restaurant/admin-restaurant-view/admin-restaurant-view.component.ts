import { Component, OnInit, Input } from '@angular/core';
import { RestaurantService } from '../../../services/restaurant/restaurant.service';
import { SessionService } from '../../../services/session.service';

@Component({
  selector: 'app-admin-restaurant-view',
  templateUrl: './admin-restaurant-view.component.html',
  styleUrls: ['./admin-restaurant-view.component.css']
})
export class AdminRestaurantViewComponent implements OnInit {
  @Input() restaurantId;

  restaurant: any;
  menus: boolean;
  allUsers: Array<any>;
  kicthenAdminUser: string;
  
  constructor(
    private restaurantServ: RestaurantService,
    private session: SessionService,
  ) { }

  ngOnInit() {
    this.getMenus();
    this.getAllUsers();
  }

  toggleMenu(){
    if(!this.menus){
      this.menus = true;
    } else {
      this.menus = false;
    }
  }

  getAllUsers(){
    this.session.getAllUsers()
      .subscribe(users => {
        this.allUsers = users.users;
      })
  }

  getMenus(){
    this.restaurantServ.getRestaurant(this.restaurantId)
      .subscribe(restaurant => {
        this.restaurant = restaurant;
      })
  }

  addKitchenAdmin(username){
    const userObj = this.allUsers.filter(obj => {
      obj.username === username;
    })
    console.log('userObj:', userObj);

    this.restaurantServ.addKitchenAdmin(userObj._id)
    .subscribe(()=>{})
    
    
  }

}
