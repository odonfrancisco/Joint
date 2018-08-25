import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-whole-order',
  templateUrl: './whole-order.component.html',
  styleUrls: ['./whole-order.component.css']
})
export class WholeOrderComponent implements OnInit {
  @Input() order;

  constructor() { }

  ngOnInit() {
    console.log(this.order)
  }

}
