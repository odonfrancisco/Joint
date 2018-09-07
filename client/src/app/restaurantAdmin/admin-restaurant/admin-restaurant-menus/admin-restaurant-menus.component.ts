import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuService } from '../../../services/menu/menu.service';

@Component({
  selector: 'app-admin-restaurant-menus',
  templateUrl: './admin-restaurant-menus.component.html',
  styleUrls: ['./admin-restaurant-menus.component.css']
})
export class AdminRestaurantMenusComponent implements OnInit {
  @Input() menus;
  @Input() restaurantId;
  @Output() getMenus = new EventEmitter<string>();

  newMenu: boolean;
  newMenuName: String = '';

  constructor(
    private menuServ: MenuService,
  ) { }

  ngOnInit() {
    this.newMenu = false;
  }

  toggleView(elem){
    this[elem] = !this[elem]
  }

  createNewMenu(){
    this.menuServ.createMenu(this.newMenuName, this.restaurantId)
      .subscribe(
        () => {
          this.newMenu = false;
          this.getMenus.emit()
        }
      );
  };

  deleteMenu(menuId){
    this.menuServ.deleteMenu(menuId.menuId, this.restaurantId)
      .subscribe(
        () => this.getMenus.emit()
      )
  }
  
}
