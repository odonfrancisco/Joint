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

  getMenu(menuId){
    return this.http.get(`${this.url}/menu/${menuId}`)
      .pipe(
        map(res => res.json())
      );
  };

  getMenuItems(menuId){
    return this.http.get(`${this.url}/menu/${menuId}/items`)
      .pipe(
        map(res => res.json())
      );
  };
  
  getMenus(restaurantId){
    return this.http.get(`${this.url}/restaurant/${restaurantId}/menus`)
      .pipe(
        map(res => res.json())
      );
  };

  addMenuItem(menuId, newItem){
    return this.http.post(`${this.url}/menu/${menuId}/items/new`, newItem)
      .pipe(
        map(res => res.json())
      );
  };

  modifyMenuItem(updatedItem){
    return this.http.post(`${this.url}/menuItem/${updatedItem._id}/update`, updatedItem)
      .pipe(
        map(res => res.json())
      );
  };

  removeMenuItem(menuItemId){
    return this.http.get(`${this.url}/menuItem/${menuItemId}/remove`)
      .pipe(
        map(res => res.json())
      );
  };

  newCategory(menuId, newCategory){
    return this.http.post(`${this.url}/menu/${menuId}/category`, {newCategory})
      .pipe(
        map(res => res.json())
      );
  };

  removeCategory(menuId, category){
    return this.http.post(`${this.url}/menu/${menuId}/category/remove`, {category})
      .pipe(
        map(res => res.json())
      );
  };

  createMenu(menuName, restaurantId){
    return this.http.post(`${this.url}/restaurant/${restaurantId}/menus/create`, {menuName})
      .pipe(
        map(res => res.json())
      );
  };
  
  deleteMenu(menuId, restaurantId){
    return this.http.post(`${this.url}/restaurant/${restaurantId}/menus/remove`, {menuId})
      .pipe(
        map(res => res.json())
      );
  };
  
}
