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

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    let param;
    this.route.params.subscribe(params => param = params)
    console.log(param)
    if (param.role){
      this[param.role] = true;
      this.auth = false;
    } else{
      this.auth = true;
    }
    
  }
}
