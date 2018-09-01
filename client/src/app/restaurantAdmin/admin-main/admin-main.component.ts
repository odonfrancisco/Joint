import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {
  @Input() restaurantId: String;

  constructor() { }

  ngOnInit() {
  }

}
