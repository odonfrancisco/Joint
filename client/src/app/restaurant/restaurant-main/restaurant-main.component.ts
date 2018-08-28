import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurant-main',
  templateUrl: './restaurant-main.component.html',
  styleUrls: ['./restaurant-main.component.css']
})
export class RestaurantMainComponent implements OnInit {
  auth: boolean;
  admin: boolean;
  kitchen: boolean;
  server: boolean;
  restaurantId: String;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    let param;
    this.route.params.subscribe(params => param = params)
    console.log(param)
    if(param.id){
      this.restaurantId = param.id;
    }
    if (param.role){
      this[param.role] = true;
      this.auth = false;
    } else{
      this.auth = true;
    }
    
  }
}
