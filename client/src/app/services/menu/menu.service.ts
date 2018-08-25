import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment.prod';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  url: String = environment.BASE_URL;

  constructor(
    private http: Http,
  ) { }

  getMenuItems(menuId){
    return this.http.get(`${this.url}/menu/${menuId}/items`)
      .pipe(
        map(res => res.json())
      )
  }
  
  getMenus(restaurantId){
    return this.http.get(`${this.url}/restaurant/${restaurantId}/menus`)
      .pipe(
        map(res => res.json())
      );
  };
  
}
