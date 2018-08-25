import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url: String = environment.BASE_URL;

  constructor(
    private http: Http,
  ) { }

  addToOrder(orderId, placeOrder){
    return this.http.post(`${this.url}/order/add/${orderId}`, placeOrder)
      .pipe(
        map(res => res.json())
      )
  }
}
