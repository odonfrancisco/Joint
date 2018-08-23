import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  url: string = environment.BASE_URL;

  constructor(
    private http: Http,
  ) { }

  getRestaurantNames(){
    return this.http.get(`${this.url}/restaurant/names`)
      .pipe(
        map(res => res.json())
      )
  }

  getRestaurant(id){
    return this.http.get(`${this.url}/restaurant/${id}`)
      .pipe(
        map(res => res.json())
      )
  }
  
}
