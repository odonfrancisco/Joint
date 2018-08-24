import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-app-order',
  templateUrl: './app-order.component.html',
  styleUrls: ['./app-order.component.css']
})
export class AppOrderComponent implements OnInit {
  tableNumber:string;
  restaurantId:string;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      param => this.restaurantId = param.id
    )
  }

}
