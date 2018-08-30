import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrderService } from '../../services/order/order.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {
  @Input() placeOrder;
  @Input() order;
  @Output() onExecute = new EventEmitter<string>();

  wholeOrderStyle: Object = {display: 'none'};
  placeOrderStyle: any;

  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit() {
  }
  /* Set the width of the side navigation to 250px */
  openPlaceOrder() {
    document.getElementById("mySidenav").style.width = "100%";
  }

  /* Set the width of the side navigation to 0 */
  closePlaceOrder() {
    document.getElementById("mySidenav").style.width = "0";
  }

  executeOrder(){
    this.orderService.addToOrder(this.order._id, this.placeOrder)
      .subscribe(
        order => {
          this.onExecute.emit();
          this.placeOrder = [];
          this.order = order;
        }
      )
  }

  toggleWholeOrder(display, sneak){
    this[display] = null;
    this[sneak] = {display:'none'}
    // console.log('sneak: ', sneak);
    // console.log('this.sneak:', this[sneak]);
    // console.log('display: ', this[display];
    // console.log('display:', display)
  }

}
