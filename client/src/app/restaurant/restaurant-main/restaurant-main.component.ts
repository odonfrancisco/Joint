import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurant-main',
  templateUrl: './restaurant-main.component.html',
  styleUrls: ['./restaurant-main.component.css']
})
export class RestaurantMainComponent implements OnInit {
  auth: boolean;
  allOrders: boolean;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.auth = true;
    this.allOrders = false;
    let param;
    this.route.params.subscribe(params => param = params)
    console.log(param)
    if (param.role){
      this.allOrders = true;
      this.auth = false;
    }
  }
}
