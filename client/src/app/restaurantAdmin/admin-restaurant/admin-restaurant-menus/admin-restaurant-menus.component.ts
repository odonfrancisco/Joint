import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-admin-restaurant-menus',
  templateUrl: './admin-restaurant-menus.component.html',
  styleUrls: ['./admin-restaurant-menus.component.css']
})
export class AdminRestaurantMenusComponent implements OnInit {
  @Input() menus;

  constructor() { }

  ngOnInit() {
  }

}
